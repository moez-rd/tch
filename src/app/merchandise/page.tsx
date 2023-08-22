'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActionIcon, Alert, Box, Button, CopyButton, FileInput, Flex, List, NumberInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMinus, IconPlus, IconUpload } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import BaseContainer from '@/components/Atoms/base-container';
import Container from '@/components/Atoms/container';
import CardListBase from '@/components/Molecules/card-list-base';
import CardListItem from '@/components/Molecules/card-list-item';
import Paragraph from '@/components/Molecules/paragraph';
import { merchandiseOptions, merchandises } from '@/config/merchandise';
import { regexs } from '@/config/regexs';
import { uploadFile } from '@/lib/firebase/storage';

interface Props {}

/**
 * React page
 *
 * @param props
 * @returns
 */
export default function MerchandisePage(props: Props) {
  // eslint-disable-next-line no-empty-pattern
  const {} = props;

  const defaultMerchandiseAmounts = merchandises.map((m) => ({
    name: m.name,
    amount: 0,
    subtotal: 0,
    variants: m.variants.map((variant) => ({ name: variant.name, amount: 0 })),
  }));

  const [merchandiseAmounts, setMerchandiseAmounts] = useState(defaultMerchandiseAmounts);

  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: '',
      whatsapp: '',
      address: '',
      proof: '',
    },

    validate: {
      name: (value) => (value === '' ? 'Nama wajib diisi' : null),
      whatsapp: (value) => (value === '' ? 'Nomor WhatsApp wajib diisi' : !regexs.phone.test(value) ? 'Nomor tidak valid' : null),
      proof: (value) => (value === '' ? 'Bukti pembayaran wajib diunggah' : null),
    },
  });

  const calculateSubtotalPrice = (
    amount: number,
    price: {
      value: number;
      pcs: number;
    }[],
    index: number = 0
  ): number => {
    if (amount === 0) {
      return 0;
    }

    const result = Math.trunc(amount / price[index].pcs) * price[index].value;

    return result + calculateSubtotalPrice(amount % price[index].pcs, price, index + 1);
  };

  const updateMerchandiseAmounts = (merchandiseName: string, merchandiseVariant: string, newAmount: number) => {
    const { price } = merchandises.filter((m) => m.name === merchandiseName)[0];
    const sortedPrice = price.sort((a, b) => b.pcs - a.pcs);

    // const updatedMerchandiseAmounts = merchandiseAmounts.map((merchandiseAmount) =>
    //   merchandiseAmount.name === merchandiseName
    //     ? {
    //         ...merchandiseAmount,
    //         subtotal: calculateSubtotalPrice(newAmount, sortedPrice),
    //         variants: merchandiseAmount.variants.map((variant) =>
    //           variant.name === merchandiseName
    //             ? {
    //                 ...variant,
    //                 amount: newAmount,
    //               }
    //             : variant
    //         ),
    //       }
    //     : merchandiseAmount
    // );

    const updatedMerchandiseVariantAmounts = merchandiseAmounts.map((merchandiseAmount) =>
      merchandiseAmount.name === merchandiseName
        ? {
            ...merchandiseAmount,
            variants: merchandiseAmount.variants.map((variant) =>
              variant.name === merchandiseVariant
                ? {
                    ...variant,
                    amount: newAmount,
                  }
                : variant
            ),
          }
        : merchandiseAmount
    );

    const updatedMerchandiseAmounts = updatedMerchandiseVariantAmounts.map((merchandiseAmount) =>
      merchandiseAmount.name === merchandiseName
        ? {
            ...merchandiseAmount,
            subtotal: calculateSubtotalPrice(
              merchandiseAmount.variants.map((value) => value.amount).reduce((a, b) => a + b, 0),
              sortedPrice
            ),
          }
        : merchandiseAmount
    );

    setMerchandiseAmounts(updatedMerchandiseAmounts);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess('');
    setLoading(true);

    form.validate();
    if (form.isValid()) {
      const formData = new FormData();

      const file = form.values.proof as unknown as File;
      const fileName = `merchandise-payment-proofs/${form.values.name}_${form.values.whatsapp}_${file.name}`;

      uploadFile(file, fileName).then((name) => {
        formData.append('nama', form.values.name);
        formData.append('whatsapp', form.values.whatsapp);
        formData.append('address', form.values.address);
        formData.append('bukti pembayaran', name);
        merchandiseAmounts.forEach((item) => {
          item.variants.forEach((variant) => {
            formData.append(`${item.name} ${variant.name}`, String(variant.amount));
          });
        });

        // https://api.sheetmonkey.io/form/dBWs6NtvKA7JZVAwDeoTwA
        // https://script.google.com/macros/s/AKfycbzBq2Cad32O5W2uVCL97RiuaTZkEvoSpwWzSOrfHn33g7Vn8YeVjoYm556LHf9aR73J/exec
        fetch(merchandiseOptions.url, {
          method: 'POST',
          body: formData,
        }).then(() => {
          setSuccess('Berhasil memesan merchandise');
          setLoading(false);
          form.resetDirty();
          setMerchandiseAmounts(defaultMerchandiseAmounts);
          router.refresh();
        });
      });
    } else {
      setLoading(false);
    }
  };
  const getTotalPrice = () => {
    return merchandiseAmounts.map((value) => value.subtotal).reduce((a, b) => a + b, 0);
  };

  useEffect(() => {
    console.log(merchandiseAmounts);
  }, [merchandiseAmounts]);

  return (
    <BaseContainer>
      <Container small>
        <Title mt="4rem">Merchandise</Title>

        <Stack mt="10rem">
          <CardListBase>
            {merchandises.map((merchandise) => (
              <CardListItem key={merchandise.name}>
                <Title order={3}>{merchandise.name}</Title>
                <Stack mt={8} spacing={2}>
                  {merchandise.price.map((pr) => (
                    <Paragraph key={pr.value}>{`Rp${pr.value.toLocaleString('id-ID')}/ ${pr.pcs} pcs`}</Paragraph>
                  ))}
                </Stack>
                <Stack spacing={2} mt="2rem">
                  {merchandise.variants.map((variant) => (
                    <Stack spacing="md">
                      <Box w="100%">
                        <Image
                          src={variant.image}
                          alt={variant.name}
                          width={400}
                          height={400}
                          style={{ objectFit: 'cover', borderRadius: '20px', width: '100%', height: '100%' }}
                        />
                      </Box>
                      <Text weight={600} size="xl">
                        {variant.name}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
              </CardListItem>
            ))}
          </CardListBase>

          <CardListBase>
            <Box p="xl">
              <Title order={2}>Ketentuan</Title>
              <List spacing="md">
                <List.Item>
                  <Paragraph>
                    Merchandise dapat diambil dan dibeli secara langsung pada 16 September 2023 di Gedung Fasilkom lt. 7 Universitas Sriwijaya Bukit Palembang.
                  </Paragraph>
                </List.Item>
                <List.Item>
                  <Paragraph>
                    Pembayaran dapat dilakukan melalui aplikasi&nbsp;
                    <Text span weight={500}>
                      Dana
                    </Text>
                    &nbsp;dengan nomor&nbsp;
                    <Text span weight={500}>
                      081367436851
                    </Text>
                    &nbsp; a.n. Ika Putri Aprilia.
                  </Paragraph>
                  <CopyButton value="081367436851">
                    {({ copied, copy }) => (
                      <Button color={copied ? 'green' : 'blue'} compact onClick={copy}>
                        {copied ? 'Disalin' : 'Salin nomor Dana'}
                      </Button>
                    )}
                  </CopyButton>
                </List.Item>
                <List.Item>
                  <Paragraph>
                    Untuk informasi lebih lanjut, Kamu dapat menghubungi&nbsp;
                    <Box component={Link} href="https://wa.me/6281367436851">
                      6281367436851
                    </Box>
                    &nbsp; a.n. Ika Putri Aprilia.
                  </Paragraph>
                </List.Item>
              </List>
            </Box>
          </CardListBase>

          <CardListItem>
            <Title order={2}>Form Pesanan</Title>
            <Paragraph>Pre-Order Merchandise Technofest 2023</Paragraph>
            <Paragraph>Pemesanan 14 Agustus - 6 September</Paragraph>

            <Box mt="md">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input type="hidden" name="Created" value="x-sheetmonkey-current-date-time" />

                <Stack>
                  <TextInput
                    size="md"
                    label="Nama"
                    name="nama"
                    placeholder="Nama"
                    variant="filled"
                    {...form.getInputProps('name')}
                    sx={(theme) => ({ input: { '&:focus-within': { borderColor: theme.colors.gray[3] } } })}
                  />

                  <TextInput
                    size="md"
                    label="Nomor WhatsApp"
                    name="whatsapp"
                    placeholder="Nomor WhatsApp"
                    variant="filled"
                    {...form.getInputProps('whatsapp')}
                    sx={(theme) => ({ input: { '&:focus-within': { borderColor: theme.colors.gray[3] } } })}
                  />

                  <TextInput
                    size="md"
                    label="Alamat (opsional)"
                    name="alamat"
                    placeholder="Alamat"
                    variant="filled"
                    {...form.getInputProps('address')}
                    sx={(theme) => ({ input: { '&:focus-within': { borderColor: theme.colors.gray[3] } } })}
                  />

                  <Text weight={500}>Pesanan</Text>
                  <Stack spacing={6}>
                    {merchandiseAmounts.map((merchandise) =>
                      merchandise.variants.map((item) => (
                        <Flex
                          px={4}
                          py={2}
                          key={`${merchandise.name} ${item.name}`}
                          justify="space-between"
                          align="center"
                          sx={(theme) => ({
                            border: `1px solid ${theme.colors.gray[1]}`,
                            borderRadius: theme.radius.md,
                          })}
                        >
                          <Text size="sm">{`${merchandise.name} ${item.name}`}</Text>
                          <Flex ml="1rem" align="center">
                            <NumberInput
                              min={0}
                              value={item.amount}
                              onChange={(value) => updateMerchandiseAmounts(merchandise.name, item.name, Number(value || 0))}
                              size="md"
                              name={item.name}
                              variant="unstyled"
                              w="4rem"
                            />
                            <Flex ml={4}>
                              <ActionIcon
                                variant="light"
                                color="red"
                                size="lg"
                                onClick={() => updateMerchandiseAmounts(merchandise.name, item.name, Number(item.amount === 0 ? 0 : item.amount - 1))}
                              >
                                <IconMinus />
                              </ActionIcon>
                              <ActionIcon
                                ml={4}
                                variant="light"
                                color="green"
                                size="lg"
                                onClick={() => updateMerchandiseAmounts(merchandise.name, item.name, Number(item.amount + 1))}
                              >
                                <IconPlus />
                              </ActionIcon>
                            </Flex>
                          </Flex>
                        </Flex>
                      ))
                    )}
                  </Stack>

                  <FileInput
                    icon={<IconUpload size={14} />}
                    size="md"
                    label="Bukti pembayaran"
                    placeholder="Unggah bukti pembayaran"
                    variant="filled"
                    {...form.getInputProps('proof')}
                    sx={(theme) => ({ input: { '&:focus-within': { borderColor: theme.colors.gray[3] } } })}
                  />

                  <input type="hidden" name="total" value={`Rp${getTotalPrice().toLocaleString('id-ID')}`} />

                  <input type="hidden" name="total" value={`Rp${getTotalPrice().toLocaleString('id-ID')}`} />
                  <Text weight={500}>Total</Text>
                  <Text weight={500} size="1.6rem">{`Rp${getTotalPrice().toLocaleString('id-ID')}`}</Text>

                  {success && (
                    <Alert color="green">
                      <Text color="green">{success}</Text>
                    </Alert>
                  )}
                </Stack>
                <Stack mt="xl" align="start">
                  <Button type="submit" variant="gradient" gradient={{ from: 'orange', to: 'red' }} size="md" mt="1rem" loading={loading}>
                    Pesan
                  </Button>
                </Stack>
              </form>
            </Box>
          </CardListItem>
        </Stack>
      </Container>
    </BaseContainer>
  );
}
