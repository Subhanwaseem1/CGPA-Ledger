<script setup>
import { computed } from 'vue';

/**
 * GPAChart — a hand-rolled inline SVG line/area chart. Avoids pulling in a
 * heavy charting dependency for a single trend line, and demonstrates
 * computed-driven SVG path generation from a props array.
 */
const props = defineProps({
  points: {
    type: Array, // [{ label, value }]
    required: true,
  },
  max: { type: Number, default: 4.0 },
});

const width = 560;
const height = 200;
const padding = { top: 16, right: 16, bottom: 32, left: 32 };

const chartArea = {
  width: width - padding.left - padding.right,
  height: height - padding.top - padding.bottom,
};

const coords = computed(() => {
  if (!props.points.length) return [];
  const step = props.points.length > 1 ? chartArea.width / (props.points.length - 1) : 0;
  return props.points.map((p, i) => ({
    x: padding.left + step * i,
    y: padding.top + chartArea.height - (p.value / props.max) * chartArea.height,
    ...p,
  }));
});

const linePath = computed(() =>
  coords.value.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ')
);

const areaPath = computed(() => {
  if (!coords.value.length) return '';
  const first = coords.value[0];
  const last = coords.value[coords.value.length - 1];
  const floorY = padding.top + chartArea.height;
  return `${linePath.value} L ${last.x.toFixed(1)} ${floorY} L ${first.x.toFixed(1)} ${floorY} Z`;
});
</script>

<template>
  <svg :viewBox="`0 0 ${width} ${height}`" class="gpa-chart" role="img" aria-label="CGPA trend across semesters">
    <!-- Gridlines -->
    <line
      v-for="g in [0, 1, 2, 3, 4]"
      :key="g"
      :x1="padding.left"
      :x2="width - padding.right"
      :y1="padding.top + chartArea.height - (g / max) * chartArea.height"
      :y2="padding.top + chartArea.height - (g / max) * chartArea.height"
      class="grid-line"
    />

    <path :d="areaPath" class="area" />
    <path :d="linePath" class="line" />

    <g v-for="(c, i) in coords" :key="i">
      <circle :cx="c.x" :cy="c.y" r="4" class="point" />
      <text :x="c.x" :y="height - 8" class="tick-label" text-anchor="middle">{{ c.label }}</text>
      <text :x="c.x" :y="c.y - 10" class="value-label" text-anchor="middle">{{ c.value.toFixed(2) }}</text>
    </g>
  </svg>
</template>

<style scoped>
.gpa-chart {
  width: 100%;
  height: auto;
}

.grid-line {
  stroke: var(--color-line);
  stroke-width: 1;
}

.area {
  fill: var(--color-accent);
  opacity: 0.08;
}

.line {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.point {
  fill: var(--color-surface);
  stroke: var(--color-accent);
  stroke-width: 2.5;
}

.tick-label {
  font-size: 9px;
  fill: var(--color-ink-500);
  font-family: var(--font-mono);
}

.value-label {
  font-size: 10px;
  fill: var(--color-ink-900);
  font-weight: 600;
  font-family: var(--font-mono);
}
</style>
