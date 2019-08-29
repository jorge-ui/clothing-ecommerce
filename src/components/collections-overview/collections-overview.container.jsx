// Components
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from '../collections-overview/collections-overview.component';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsIsFetching } from '../../redux/shop/shop.selectors';

const mapStateToProps = createStructuredSelector({
  isLoading: selectCollectionsIsFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
