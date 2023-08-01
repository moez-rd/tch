'use client';

import { Accordion } from '@mantine/core';

import Container from '@/components/Atoms/container';
import type { Faq } from '@/types/technofest';

interface Props {
  faqs: Faq[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function FaqFaqList(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { faqs } = props;

  return (
    <Container small>
      <Accordion>
        {faqs.map((faq) => (
          <Accordion.Item value={faq.question} key={faq.id}>
            <Accordion.Control>{faq.question}</Accordion.Control>
            <Accordion.Panel>{faq.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
