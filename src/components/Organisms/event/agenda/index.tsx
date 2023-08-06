'use client';

import { Card, Text, Timeline, TimelineItem, Title } from '@mantine/core';
import { IconStack } from '@tabler/icons-react';

import Container from '@/components/Atoms/container';
import SectionHeader from '@/components/Molecules/section-header';
import { formatDate } from '@/lib/utils';
import type { Competition, Event, Milestone, Seminar } from '@/types/technofest';

interface Props {
  milestones: Milestone<Event<Seminar | Competition>>[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function EventAgenda(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { milestones } = props;

  return (
    <Container>
      <Card bg="gray.1" py="3rem">
        <Container small>
          <SectionHeader title="Agenda" subtitle="Agenda" position="center" />
          <Timeline active={100} color="green" bulletSize={26} mt="2rem">
            {milestones.map((milestone) => (
              <TimelineItem key={milestone.id} bullet={<IconStack size={16} spacing={0} />}>
                <Text color="green.7" size="xs" ff="monospace" weight={600}>
                  {formatDate(milestone.date)}
                </Text>
                <Title order={3} color="gray.7">
                  {milestone.name}
                </Title>
                <Text color="dimmed" size="sm">
                  {milestone.description}
                </Text>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Card>
    </Container>
  );
}
