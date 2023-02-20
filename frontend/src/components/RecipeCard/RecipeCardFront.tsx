import React from 'react';
import styles from './RecipeCardFront.module.scss';

type Props = {
  title: string;
  imgUrl: string;
  recipeProperties: string[];
};

export default function RecipeCardFront({
  title,
  imgUrl,
  recipeProperties,
}: Props) {
  return (
    <div className={styles.cardOuter}>
      <div className={styles.cardInner}>
        <h2
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            margin: 0,
            padding: 0,
            flex: 1,
            textAlign: 'left',
          }}
        >
          {title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          {recipeProperties.map((p) => {
            return <div key={p}>{p}</div>;
          })}
        </div>
      </div>
      <hr
        style={{
          borderTop: '1px solid black',
          width: '100%',
          borderBottom: '1px solid black',
          borderRadius: 4,
          margin: 0,
        }}
      />
      {/* <img
        style={{ maxWidth: '100%' }}
        alt="food"
        src="https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505"
      /> */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'lightblue',
          height: '100%',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <img
          style={{ minHeight: '100%', objectFit: 'cover', width: '100%' }}
          alt="food"
          src="https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505"
        />
      </div>
    </div>
  );
}
