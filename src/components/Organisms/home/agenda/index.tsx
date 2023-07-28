'use client';

import { Box, Grid, Text, Timeline, TimelineItem, Title } from '@mantine/core';
import { IconStack } from '@tabler/icons-react';

import Container from '@/components/Atoms/container';
import SectionHeader from '@/components/Molecules/section-header';
import { formatDate } from '@/lib/utils';
import type { Festival, Milestone } from '@/types/technofest';

interface Props {
  milestones: Milestone<Festival>[];
}

/**
 * React component
 *
 * @param props
 * @returns
 */
export default function HomeAgenda(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const { milestones } = props;

  return (
    <Box bg="dark.5" py="6rem">
      <Container>
        <Grid gutter="2rem">
          <Grid.Col span={3}>
            <SectionHeader title="Agenda" subtitle="Agenda" position="start" dark />
          </Grid.Col>
          <Grid.Col span="content">
            <Timeline active={100} color="green" bulletSize={26}>
              {milestones.map((milestone) => (
                <TimelineItem bullet={<IconStack size={16} spacing={0} key={milestone.id} />}>
                  <Text color="green.3" size="xs" ff="monospace" weight={600}>
                    {formatDate(milestone.date)}
                  </Text>
                  <Title order={3} color="gray.0">
                    {milestone.name}
                  </Title>
                  <Text color="dimmed" size="sm">
                    {milestone.description}
                  </Text>
                </TimelineItem>
              ))}
            </Timeline>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
