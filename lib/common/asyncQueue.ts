export class AsyncQueue {
    private queue = new Map<string,() => Promise<void>>()


    private isProcessing: boolean = false;

    enqueue(task: () => Promise<void>, id = Date.now().toString()): void {
        if(!this.queue.has(id)){
            this.queue.set(id, task);
        }
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    private async processQueue(): Promise<void> {
        this.isProcessing = true;
        for(const [id, task] of this.queue) {
            try {
                await task();
                this.queue.delete(id);
            } catch (error) {
                console.error('Error processing task:', error);
            }
        }
        this.isProcessing = false;
    }
}
