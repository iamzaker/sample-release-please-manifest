const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function invokeTask() {
  const queue = new TaskQueue(3); // Set concurrency to 3

  // Add tasks to the queue
  for (let i = 1; i <= 10; i++) {
    queue.add(async () => {
      console.log(`Task ${i} started.`);
      await delay(1000); // Simulate some async work
      console.log(`Task ${i} finished.`);
    });
  }

  // Wait for the queue to complete
  const interval = setInterval(() => {
    if (queue.isIdle()) {
      console.log("All tasks completed.");
      clearInterval(interval);
    }
  }, 100);
}

invokeTask();