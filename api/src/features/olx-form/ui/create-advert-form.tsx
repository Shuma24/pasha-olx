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
} from '../model/constatns';

export const CreateAdvertForm = () => {
  const { register, handleSubmit, errors } = useSignInForm();

  return (
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
        error={errors.type?.message}
      />

      <UiSelectField
        options={selectAdvertTypeOptions}
        label='Тип оголошення'
        {...register('advertiserType')}
      />
      <UiSelectField options={selectTypeOptions} label='Тип' {...register('type')} />
      <UiSelectField options={selectQuantityOptions} label='Кількість' {...register('quantity')} />
      <UiSelectField options={selectStateOptions} label='Стан' {...register('state')} />
      <UiSelectField options={selectBrandOptions} label='Бренд' {...register('brand')} />
      <UiButton className='mt-5 mb-5' variant='primary'>
        Create
      </UiButton>
    </form>
  );
};
