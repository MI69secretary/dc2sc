import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import starlight from '@astrojs/starlight-markdoc';

export default defineMarkdocConfig({
  extends: [starlight()],
  tags: {
    callout: {
      render: component('./src/components/site/Callout.astro'),
      attributes: {
        title: { type: String },
        type: { type: String, default: 'boundary' },
      },
    },
    diagram: {
      render: component('./src/components/research/DiagramContainer.astro'),
      attributes: {
        mediaId: { type: String, required: true },
        caption: { type: String },
        altText: { type: String },
        authority: { type: String, default: 'derived_noncanonical' },
        epistemicBasis: { type: String, default: 'conceptual' },
      },
    },
    tableMatrix: {
      render: component('./src/components/research/TableMatrixContainer.astro'),
      attributes: {
        tableId: { type: String, required: true },
        title: { type: String },
        kind: { type: String, default: 'argument_table' },
        caption: { type: String },
      },
    },
    chartContainer: {
      render: component('./src/components/research/ChartContainer.astro'),
      attributes: {
        chartId: { type: String, required: true },
        title: { type: String },
        dataSource: { type: String },
        evidenceLevel: { type: String, default: 'E0' },
      },
    },
    researchHandoff: {
      render: component('./src/components/research/ResearchHandoffBlock.astro'),
      attributes: {
        targetModule: { type: String, required: true },
        targetUrl: { type: String, required: true },
        handoffQuestion: { type: String },
      },
    },
    formula: {
      render: component('./src/components/research/FormulaBlock.astro'),
      attributes: {
        formulaId: { type: String },
        title: { type: String },
        latex: { type: String, required: true },
        equationNumber: { type: String },
        theoremType: { type: String, default: 'invariant' },
        status: { type: String, default: 'FORMALLY VERIFIED' },
        variables: { type: String },
        description: { type: String },
      },
    },
  },
});

