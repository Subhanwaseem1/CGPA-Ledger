<script setup>
/**
 * DataTable — generic table shell driven by a `columns` prop, with a
 * named-slot-per-column escape hatch (`#cell-<key>`) so callers can render
 * custom cell markup (badges, action buttons) without forking the table.
 */
defineProps({
  columns: {
    type: Array,
    required: true,
    // [{ key, label, align }]
  },
  rows: { type: Array, required: true },
  rowKey: { type: String, default: 'id' },
});
</script>

<template>
  <div class="table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key" :class="col.align">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row[rowKey]">
          <td v-for="col in columns" :key="col.key" :class="col.align">
            <slot :name="`cell-${col.key}`" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--fs-body-sm);
}

thead th {
  text-align: left;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface-sunken);
  color: var(--color-ink-500);
  font-weight: 600;
  font-size: var(--fs-caption);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

tbody td {
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-line);
  color: var(--color-ink-900);
}

tbody tr:hover {
  background: var(--color-surface-sunken);
}

.align-right { text-align: right; }
.align-center { text-align: center; }
</style>
