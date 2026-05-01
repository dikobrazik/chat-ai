import styles from "./Switch.module.scss";

export const Switch = () => {
  return (
    <label className="relative">
      <input type="checkbox" className={`${styles.input} peer sr-only`} />

      <div className={styles.container}>
        <div className={styles.knob} />
      </div>
    </label>
  );
};
