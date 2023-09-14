import { pipeline } from '@xenova/transformers'
import { summaryExample } from './utils/summary.js'

export async function summarize(text) {
  try{
    // return summaryExample
    console.log('Summarizing text...')
    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
      )

      const output = await generator (text)

      console.log('Text summarized.')

      return output[0].summary_text
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}