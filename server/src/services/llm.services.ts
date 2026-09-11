import type { TranslationDirection } from '@prisma/client';

export const generatePromptSentence = async (
  grammarTopic: string,
  direction: TranslationDirection,
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // This just simulates a little 200ms network delay like when we actually make an llm API call

  if (direction === 'JA_T0_EN') {
    return `雨が降れば、明日のイベントは中止になります。[Topic: ${grammarTopic}]`;
  }

  if (direction === 'EN_TO_JA') {
    return `If you study Japanese every single day, you will definitely pass the exam.[Topic: ${grammarTopic}]`;
  }

  return 'Looks like something went wrong Morgan, haha';
};
