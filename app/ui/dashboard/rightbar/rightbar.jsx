import Image from 'next/image';
import styles from './rightbar.module.css';
import { MdPlayCircleFilled, MdReadMore } from 'react-icons/md';

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src='/astronaut.png' alt='' fill className={styles.bg} />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 Available Now</span>
          <h3 className={styles.title}>
            How to use the new version of the admin dashboard?
          </h3>
          <span className={styles.subtitle}>Tasks 4 minutes to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            quibusdam quo molestias laboriosam ipsam! Minima ab neque fugit odio
            dolorum alias fugiat omnis est sit minus, optio quasi et esse?
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div cwlassName={styles.text}>
          <span className={styles.notification}>🚀 Coming Soon</span>
          <h3 className={styles.title}>
            New server actions are available, partical pre-rendering is coming
            soon up!
          </h3>
          <span className={styles.subtitle}>Boost your productivity</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            quibusdam quo molestias laboriosam ipsam! Minima ab neque fugit odio
            dolorum alias fugiat omnis est sit minus, optio quasi et esse?
          </p>
          <button className={styles.button}>
            <MdReadMore />
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
