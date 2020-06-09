import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ItemView from "../../components/itemView/ItemView.component";
import { hideItem } from "../../redux/item/item.actions";
import WithSpinner from "../../components/withSpinner/WithSpinner.component";

import { HomeStyle, HomeContainerStyle } from "./Home.style";
import Header from "../../components/header/Header.component";
import ItemsList from "../../components/itemsList/ItemsList.component";
import { updateCollection } from "../../redux/collection/collection.actions";
import { updateKeys } from "../../redux/keys/keys.actions";
import {
  firestore,
  convertCollectionsSnapshotToMap,
  auth,
} from "../../firebase/firebase.utils";

const HomeStyleWithSpinner = WithSpinner(HomeStyle);

class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchField: "",
      isLoading: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.hideItem();
    const { updateCollection, updateKeys, currentUser } = this.props;
    const keysRef = firestore.collection("keys");
    const collectionsRef = firestore.collection(currentUser.id);

    keysRef.onSnapshot(async (snapshot) => {
      updateKeys(snapshot.docs[0].data());
    });

    collectionsRef.onSnapshot(async (snapshot) => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollection(collectionMap);
      this.setState({
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    localStorage.clear();
    this.setState({
      isLoading: true,
    });
    this.props.hideItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.props.history.push("/");
      this.props.hideItem();
    }
  }

  handleChange(event) {
    this.setState({ searchField: event.target.value });
  }

  render() {
    const { searchField, isLoading } = this.state;
    const { collection } = this.props;

    const filteredItems = collection.filter((item) =>
      item.title.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <HomeStyleWithSpinner isLoading={isLoading}>
        <Header
          onChange={this.handleChange}
          onClick={() => {
            auth.signOut();
          }}
        />
        <HomeContainerStyle>
          <ItemsList filteredItems={filteredItems} />
          <ItemView />
        </HomeContainerStyle>
      </HomeStyleWithSpinner>
    );
  }
}

Home.propTypes = {
  collection: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  hideItem: PropTypes.func.isRequired,
  updateCollection: PropTypes.func.isRequired,
  updateKeys: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collection: state.collection.items,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  hideItem: () => dispatch(hideItem()),
  updateCollection: (collectionMap) =>
    dispatch(updateCollection(collectionMap)),
  updateKeys: (collection) => dispatch(updateKeys(collection)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
