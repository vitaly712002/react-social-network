import React from 'react';
import { WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import styles from './FormsControls.module.css';
type FormControlParamsTypes = {
  meta: WrappedFieldMetaProps;
};

const FormControl: React.FC<FormControlParamsTypes> = ({ meta, children }) => {
  const hasError = meta.error && meta.touched;
  return (
    <div className={`${styles.formControl}  ${hasError ? styles.error : ' '}`}>
      {children}
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;

  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};
export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, children, ...restProps } = props;

  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};
