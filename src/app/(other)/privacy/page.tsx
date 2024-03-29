import * as fs from 'fs';
import type { Metadata } from 'next';
import path from 'path';

import BaseContainer from '@/components/Atoms/base-container';
import PrivacyPolicyBody from '@/components/Organisms/privacy-policy/body';
import { appConfig } from '@/config/app';

/**
 * Props interface
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {}

/**
 *
 * @param props
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  return {
    title: `Privasi - ${appConfig.title}`,
  };
}

/**
 * React page
 *
 * @param props
 * @returns
 */
export default async function PrivacyPage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const filePath = path.join(process.cwd(), 'privacy.md');
  const privacy = fs.readFileSync(filePath, 'utf-8');

  return (
    <BaseContainer>
      <PrivacyPolicyBody privacy={privacy} />
    </BaseContainer>
  );
}
