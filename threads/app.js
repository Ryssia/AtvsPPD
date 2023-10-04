const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {

  const numWorkers = 4; // Número de threads que serao criadas

  const results = [];

  
  const runWorker = (index) => {               // Função para iniciar uma thread
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { index },
      });

      worker.on('message', (message) => {
        results[index] = message;
        resolve();
      });

      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Thread ${index} saiu com código de erro ${code}`));
        }
      });
    });
  };

  // Iniciar todas as threads
  async function main() {
    const promises = [];

    for (let i = 0; i < numWorkers; i++) {
      promises.push(runWorker(i));
    }

    await Promise.all(promises);

    console.log('Resultados:', results);
  }

  main();
} else {
  
  const { index } = workerData;
  const delay = Math.floor(Math.random() * 5000); // Simula um tempo de execução variável

  setTimeout(() => {
    parentPort.postMessage(`Thread ${index} completou após ${delay} ms`);
  }, delay);
}
