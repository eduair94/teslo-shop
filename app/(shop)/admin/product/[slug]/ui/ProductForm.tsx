'use client';

import { createUpdateProduct, deleteProductImage } from '@/actions';
import { Button, ProductImage as Image } from '@/components';
import { ICategory, IProduct, ProductImage } from '@/interfaces';
import { faker } from '@faker-js/faker';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  product: Partial<IProduct & { ProductImage?: ProductImage[] }>;
  categories: ICategory[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const genders = ['men', 'women', 'kid', 'unisex'];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;
  images?: File[] | FileList;
}

export const ProductForm: FC<Props> = ({ product, categories }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: (product.tags ?? []).join(', '),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(0);
  const [images, setImages] = useState<File[]>([]);

  watch('sizes');

  const router = useRouter();

  const onSubmit = async (data: FormInputs) => {
    console.log({ data });
    const formData = new FormData();
    const { ...productToSave } = data;

    const jsonData = {
      id: product.id ?? '',
      title: productToSave.title,
      slug: productToSave.slug,
      description: productToSave.description,
      price: productToSave.price.toString(),
      inStock: productToSave.inStock.toString(),
      sizes: productToSave.sizes.toString(),
      tags: productToSave.tags,
      categoryId: productToSave.categoryId,
      gender: productToSave.gender,
    };

    for (const key in jsonData) {
      const value = jsonData[key as keyof typeof jsonData] as string;
      if (key === 'id' && !value) continue;
      formData.append(key, value);
    }

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    setFormLoading(true);
    const { ok, product: updatedProduct } = await createUpdateProduct(formData);
    if (ok) {
      toast.success(`${jsonData.title} updated`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setImages([]);
      router.replace(`/admin/product/${updatedProduct?.slug}`);
    } else {
      toast.error(`Error updating ${jsonData.title}`);
    }
    setFormLoading(false);
  };

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes), { shouldValidate: true });
  };

  const randomData = async () => {
    const title = faker.commerce.productName();
    const slug = title.replace(/\s+/g, '-').toLowerCase();

    async function generateFakeImageFiles(count: number) {
      async function fetchImageData(url: string) {
        const response = await fetch(url);
        const imageData = await response.blob();
        return imageData;
      }

      function blobToFile(blob: Blob, fileName: string) {
        return new File([blob], fileName, { type: blob.type });
      }

      const files = [];
      for (let i = 0; i < count; i++) {
        const imageUrl = faker.image.urlLoremFlickr({ category: 'animals' });
        const imageData = await fetchImageData(imageUrl);
        const imageFile = blobToFile(imageData, `fakeImage-${i}.jpg`);
        files.push(imageFile);
      }
      return files;
    }

    const images = await generateFakeImageFiles(3);
    setImages(images);

    const data = {
      title: title,
      slug: slug,
      description: faker.commerce.productDescription(),
      price: faker.commerce.price().toString(),
      inStock: faker.number.int({ min: 1, max: 500 }),
      sizes: faker.helpers.arrayElements(sizes), // Example, modify as needed
      tags: faker.lorem.words(3).split(' '), // Generates 3 random tags
      categoryId: faker.helpers.arrayElement(categories.map((el) => el.id)),
      gender: faker.helpers.arrayElement(genders),
    };
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof FormInputs, value, { shouldValidate: true });
    });
  };

  const onDeleteImage = async (image: ProductImage) => {
    setDeleteLoading(image.id);
    const res = await deleteProductImage(image.id, image.url);
    if (res.ok) toast.success(res.message);
    else toast.error(res.message);
    setDeleteLoading(0);
  };

  const onDeleteImageFile = async (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('On change images');
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      console.log('To set', [...images, ...newImages]);
      setImages([...images, ...newImages]);
    }
    e.target.value = '';
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('title', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('price', { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('tags', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('gender', { required: true })}
          >
            <option value="">[Select]</option>
            {genders.map((el) => (
              <option key={el} value={el} className="capitalize">
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('categoryId', { required: true })}
          >
            <option value="">[Select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Button
          className="w-full"
          type="submit"
          loading={formLoading}
          disabled={!isValid}
        >
          Save
        </Button>
        <button
          onClick={() => randomData()}
          type="button"
          className="btn-primary w-full mt-2"
        >
          Generate Random Data
        </button>
      </div>

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register('inStock', { required: true, min: 0 })}
          />
        </div>
        <div className="flex flex-col">
          <span>Sizes</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => onSizeChange(size)}
                className={clsx(
                  'cursor-pointer p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center',
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size),
                  },
                )}
              >
                <span>{size}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col mb-2">
            <span>Photos</span>
            <input
              type="file"
              multiple
              name="images"
              onChange={(e) => onChangeImages(e)}
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>
          {images.length ? (
            <div className="mt-3">
              <span className="block mb-1">Images to be uploaded</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="w-fit">
                    <Image
                      blob
                      alt={product.title ?? ''}
                      src={URL.createObjectURL(image)}
                      width={300}
                      height={300}
                      className="shadow-md rounded-t w-[300px] h-[300px] object-cover"
                    />
                    <Button
                      loading={false}
                      btnClass="btn-danger"
                      type="button"
                      onClick={() => onDeleteImageFile(index)}
                      className="w-full rounded-b-xl"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="mt-3">
            <span className="block mb-1">Already uploaded images</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {product.ProductImage?.map((image) => (
                <div key={image.id} className="w-fit">
                  <Image
                    alt={product.title ?? ''}
                    src={image.url}
                    width={300}
                    height={300}
                    className="shadow-md rounded-t w-[300px] h-[300px] object-cover"
                  />
                  <Button
                    loading={deleteLoading === image.id}
                    btnClass="btn-danger"
                    type="button"
                    onClick={() => onDeleteImage(image)}
                    className="w-full rounded-b-xl"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
