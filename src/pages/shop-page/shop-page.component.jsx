import React, { useState } from 'react';
import { SHOP_DATA } from './shop-page.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const ShopPage = () => {
  const [shopCollections] = useState(SHOP_DATA);
  return (
    <div className="shop-page">
      <h1>COLLECTIONS</h1>
      {shopCollections.map(({ id, ...rest }) => (
        <CollectionPreview key={id} {...rest} />
      ))}
    </div>
  );
};

export default ShopPage;
