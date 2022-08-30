import styles from './Loader.module.css';

export default function Loader({ full = false }) {
  return <div className={`${styles.loader} ${full && '!w-full'}`}></div>;
}
