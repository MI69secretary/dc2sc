import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config.ts';

const reader = createReader(process.cwd(), keystaticConfig);

async function run() {
  console.log('=== VERIFYING ALL KEYSTATIC COLLECTIONS ===');
  let colSuccess = 0;
  let colTotal = 0;
  for (const [colName, col] of Object.entries(reader.collections)) {
    colTotal++;
    try {
      const items = await col.all();
      console.log('  [PASS] ' + colName + ': ' + items.length + ' items');
      colSuccess++;
    } catch (e) {
      console.error('  [FAIL] ' + colName + ': ' + e.message);
    }
  }

  console.log('=== VERIFYING ALL KEYSTATIC SINGLETONS ===');
  let singSuccess = 0;
  let singTotal = 0;
  for (const [singName, sing] of Object.entries(reader.singletons)) {
    singTotal++;
    try {
      const data = await sing.read();
      console.log('  [PASS] ' + singName + ': LOADED');
      singSuccess++;
    } catch (e) {
      console.error('  [FAIL] ' + singName + ': ' + e.message);
    }
  }

  console.log('Summary: ' + colSuccess + '/' + colTotal + ' collections, ' + singSuccess + '/' + singTotal + ' singletons.');
  if (colSuccess !== colTotal || singSuccess !== singTotal) {
    process.exit(1);
  }
}

run();
