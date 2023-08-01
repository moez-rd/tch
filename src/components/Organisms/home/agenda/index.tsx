'use client';

import { Box, Flex, Text, Timeline, TimelineItem, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconStack } from '@tabler/icons-react';

import Container from '@/components/Atoms/container';
import Paragraph from '@/components/Molecules/paragraph';
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

  const theme = useMantineTheme();

  const maxSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Box bg="dark.5" py="6rem">
      <Container>
        <Flex gap={maxSm ? '4rem' : '8rem'} direction={maxSm ? 'column' : 'row'}>
          <Box>
            <SectionHeader title="Agenda" subtitle="Agenda" position="start" dark />
          </Box>
          <Box>
            <Timeline active={100} color="green" bulletSize={26}>
              {milestones.map((milestone) => (
                <TimelineItem bullet={<IconStack size={16} spacing={0} key={milestone.id} />}>
                  <Text color="green.3" size="xs" ff="monospace" weight={600}>
                    {formatDate(milestone.date)}
                  </Text>
                  <Title order={3} color="gray.0">
                    {milestone.name}
                  </Title>
                  <Paragraph color="dimmed" display="inline">
                    {milestone.description} dasdad dasdn dakd kada kdadand
                  </Paragraph>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
