import Head from "next/head";
import {
  Container,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Spinner,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useProducts } from "@/features/product/useProducts";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export default function Home() {
  const { data, isLoading, refetch: refetchProducts } = useProducts();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      image: "",
    },
    onSubmit: () => {
      const { name, price, description, image } = formik.values;
      console.log(formik.values);
      mutate({
        name,
        price: parseInt(price),
        description,
        image,
      });
      formik.setFieldValue("name", "");
      formik.setFieldValue("price", 0);
      formik.setFieldValue("description", "");
      formik.setFieldValue("image", "");
      toast({
        title: "product ditambahkan",
        status: "success",
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (body) => {
      const productsResponse = await axiosInstance.post("/products", body);
      return productsResponse;
    },
    onSuccess: () => {
      refetchProducts();
    },
  });

  const handleFormInput = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const renderProducts = () => {
    return data?.data.map((product, index) => {
      return (
        <Tr key={product.id}>
          <Td>{index + 1}</Td>
          <Td>{product.name}</Td>
          <Td>{product.price}</Td>
          <Td>{product.description}</Td>
          <Td>{product.image}</Td>
        </Tr>
      );
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container m={2}>
          <Heading>Hello World</Heading>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>description</Th>
                  <Th>image</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading && <Spinner />}
                {renderProducts()}
              </Tbody>
            </Table>
          </TableContainer>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing="5">
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="name"
                  onChange={handleFormInput}
                  value={formik.values.name}
                />
                <FormHelperText>Title product</FormHelperText>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  onChange={handleFormInput}
                  value={formik.values.price}
                />
                <FormHelperText>Price product</FormHelperText>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  onChange={handleFormInput}
                  value={formik.values.description}
                />
                <FormHelperText>Description product</FormHelperText>
                <FormLabel>Images</FormLabel>
                <Input
                  name="image"
                  onChange={handleFormInput}
                  value={formik.values.image}
                />
                <FormHelperText>Image for product</FormHelperText>
                <Button
                  bgGradient="linear(to-t, green.200, pink.500)"
                  type="submit"
                >
                  Submit product
                </Button>
              </FormControl>
            </VStack>
          </form>
        </Container>
      </main>
    </>
  );
}
