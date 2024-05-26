import { useForm } from '/@/components/Form';

const schemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 12,
    },
    defaultValue: '111',
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 12,
    },
  },
];
export const useFormData = () => {
  const [registerForm, { setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas,
    // showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  // 方式1
  setFieldsValue({
    field2: 'data.data',
    field1: 'data.info',
  });

  return { schemas, registerForm };
};
