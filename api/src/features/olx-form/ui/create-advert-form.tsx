import React from 'react';
import { useSignInForm } from '../model/use-create-advert';
import { UiButton, UiSelectField, UiTextInputField } from '@/src/shared/ui';
import {
  selectAdvertTypeOptions,
  selectBrandOptions,
  selectQuantityOptions,
  selectStateOptions,
  selectTypeOptions,
  sizePattern,
  yearPattern,
} from '../model/constants';

export const CreateAdvertForm = () => {
  const { register, handleSubmit, errorMessage, data, loading } = useSignInForm();

  return (
    <>
      {data && (
        <div className='mb-10'>
          <span className='text-lime-500 text-base'>
            SUCCESS! created {data.olxId} and {data.tiresId}
          </span>
        </div>
      )}

      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <UiTextInputField
          label='Зображення'
          inputProps={{
            type: 'file',
            multiple: true,
            accept: 'image/*',
            required: true,
            ...register('images', { required: true }),
          }}
        />
        <UiTextInputField
          label='Назва'
          inputProps={{ type: 'text', required: true, ...register('title', { required: true }) }}
        />
        <UiTextInputField
          label='Опис'
          className=''
          inputProps={{
            type: 'text',
            minLength: 80,
            required: true,
            ...register('description', { required: true }),
          }}
        />
        <UiTextInputField
          label='Ціна'
          inputProps={{ type: 'text', required: true, ...register('price', { required: true }) }}
        />
        <UiTextInputField
          label='Рік'
          inputProps={{
            type: 'text',
            required: true,
            ...register('year', {
              required: true,
              pattern: {
                value: yearPattern,
                message: 'Invalid size format (e.g., 215/70/15)',
              },
            }),
          }}
        />

        <UiTextInputField
          label='Розмір'
          inputProps={{
            type: 'text',
            required: true,
            ...register('size', {
              pattern: {
                value: sizePattern,
                message: 'Invalid size format (e.g., 215/70/15)',
              },
            }),
          }}
        />

        <UiSelectField
          options={selectAdvertTypeOptions}
          label='Тип оголошення'
          {...register('advertiserType')}
        />
        <UiSelectField options={selectTypeOptions} label='Тип' {...register('type')} />
        <UiSelectField
          options={selectQuantityOptions}
          label='Кількість'
          {...register('quantity')}
        />
        <UiSelectField options={selectStateOptions} label='Стан' {...register('state')} />
        <UiSelectField options={selectBrandOptions} label='Бренд' {...register('brand')} />
        <UiButton className='mt-5 mb-5' variant='primary' disabled={loading}>
          Create
        </UiButton>

        {errorMessage && <div className='text-rose-500'>{errorMessage}</div>}
      </form>
    </>
  );
};
