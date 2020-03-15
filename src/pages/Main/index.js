import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  DeleteButton,
} from './styles';

export default class Main extends Component {
  static navigationOptions = { title: 'Usuários' };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    err: null,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    try {
      const { users, newUser } = this.state;

      this.setState({ loading: true });

      if (newUser === '') throw new Error('Informe o repositório!');

      const checkUser = users.find(
        r => r.login.toUpperCase() === newUser.toUpperCase()
      );

      if (checkUser) throw new Error('Repositório duplicado');

      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
        err: false,
      });

      Keyboard.dismiss();
    } catch (error) {
      this.setState({ err: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  handleDelete = user => {
    const { users } = this.state;
    const gitUser = users.filter(u => u !== user);

    this.setState({ users: [...gitUser] });
  };

  renderRightItems = item => {
    return (
      <DeleteButton onPress={() => this.handleDelete(item)}>
        <Icon name="delete-forever" size={50} color="#FFF" />
      </DeleteButton>
    );
  };

  render() {
    const { users, newUser, loading, err } = this.state;

    return (
      <Container>
        <Form>
          <Input
            error={err}
            autoCorrect={false}
            autoCaptalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => this.renderRightItems(item)}>
              <User onPress={() => this.handleNavigate(item)}>
                <Avatar source={{ uri: item.avatar }} />
                <Name>{item.name}</Name>
                <Bio>{item.bio}</Bio>
              </User>
            </Swipeable>
          )}
        />
      </Container>
    );
  }
}
