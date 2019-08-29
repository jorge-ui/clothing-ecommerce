// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsIsLoaded } from '../../redux/shop/shop.selectors';
// Components
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from '../collection-page/collection-page.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectCollectionsIsLoaded(state)
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
