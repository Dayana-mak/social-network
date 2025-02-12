import styles from "./FormControls.module.css"

export const Textarea = ( {input, meta, ...props} )  => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={`${styles.formControl} ${hasError && styles.error}`}>
      <div>
        <textarea {...input} {...props}/>
      </div>
      {hasError && <span className={styles.error}>{meta.error}</span>}
    </div>
  )
}

export const Input = ( {input, meta, ...props} )  => {
  const hasError = meta.touched && meta.error;

  return (
    <div className={`${styles.formControl} ${hasError && styles.error}`}>
      <div>
        <input {...input} {...props}/>
      </div>
      {hasError && <span className={styles.error}>{meta.error}</span>}
    </div>
  )
}