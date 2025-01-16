type Task = () => Promise<any>;

class TaskQueue {
  private queue: Task[] = [];
  private concurrency: number;
  private activeTasks = 0;

  constructor(concurrency: number) {
    if (concurrency < 1) {
      throw new Error("Concurrency must be at least 1.");
    }
    this.concurrency = concurrency;
  }

  /**
   * Add a new task to the queue.
   * @param task A function that returns a Promise.
   */
  add(task: Task): void {
    this.queue.push(task);
    this.processQueue(); // Start processing if possible
  }

  /**
   * Processes tasks in the queue, respecting concurrency limits.
   */
  private async processQueue(): Promise<void> {
    if (this.activeTasks >= this.concurrency || this.queue.length === 0) {
      return; // Either concurrency limit is reached, or the queue is empty
    }

    const task = this.queue.shift();
    if (!task) return;

    this.activeTasks++;

    try {
      await task(); // Execute the task
    } catch (error) {
      console.error("Task failed:", error);
    } finally {
      this.activeTasks--;
      this.processQueue(); // Process the next task
    }
  }

  /**
   * Check if the queue is empty.
   */
  isIdle(): boolean {
    return this.queue.length === 0 && this.activeTasks === 0;
  }
}