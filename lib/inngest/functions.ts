import { inngest } from './client';

// Define inngest functions for background processing
export const processAIQuery = inngest.createFunction(
  { id: 'process-ai-query' },
  { event: 'ai.query.submitted' },
  async ({ event, step }) => {
    const { chatId, messageId, query } = event.data;
    
    // Log the query being processed
    await step.log('Processing query', { query });
    
    // Track start time for performance metrics
    const startTime = Date.now();
    
    // This would be where you'd call your AI service and get sources
    // For demo, we'll just simulate processing time
    const result = await step.run('simulate-ai-processing', async () => {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return simulated result
      return {
        answer: `This is a simulated answer for "${query}"`,
        sources: [
          { id: '1', title: 'Example Source 1', url: 'https://example.com/1' },
          { id: '2', title: 'Example Source 2', url: 'https://example.com/2' }
        ]
      };
    });
    
    // Calculate processing time
    const processingTimeMs = Date.now() - startTime;
    
    // Send completion event
    await step.sendEvent('ai.query.completed', {
      data: {
        chatId,
        messageId,
        query,
        processingTimeMs,
        sourcesCount: result.sources.length
      },
    });
    
    return {
      result,
      processingTimeMs,
    };
  }
);