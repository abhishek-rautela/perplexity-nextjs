import { NextRequest, NextResponse } from 'next/server';
import { serve } from 'inngest/next';
import { inngest } from '@/lib/inngest/client';
import { processAIQuery } from '@/lib/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processAIQuery,
    // Add more Inngest functions here
  ],
});