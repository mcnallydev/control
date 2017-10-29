import React, { Component } from 'react';
import { Link } from 'found';
import Cookies from 'js-cookie';
import { Sidebar, Items, Item, LinkClassName, LinkActiveClassName, Text, Icon, Page } from './styles';
import Login from './components/pages/auth/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: (Cookies.get('Authorization') !== undefined),
      showSidebar: false
    };
  }

  onChangeLogin = (isAuthenticated) => {
    this.setState({
      isAuthenticated: isAuthenticated
    });
  }

  renderPages() {
    if (this.state.isAuthenticated) {
      return this.renderDashboard();
    } else {
      return (
        <Login onChange={this.onChangeLogin} />
      );
    }
  }

  renderDashboard() {
    return (
      <div>
        <Sidebar>
          <Items>
            <Item>
              <Link to="/" className={LinkClassName} activeClassName={LinkActiveClassName} exact>
                <Icon className="material-icons">home</Icon>
                <Text>Inicio</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/assists" className={LinkClassName} activeClassName={LinkActiveClassName} exact>
                <Icon className="material-icons">playlist_add_check</Icon>
                <Text>Asistencias</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/reports" className={LinkClassName} activeClassName={LinkActiveClassName} exact>
                <Icon className="material-icons">assessment</Icon>
                <Text>Reportes</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/billing" className={LinkClassName} activeClassName={LinkActiveClassName} exact>
                <Icon className="material-icons">attach_money</Icon>
                <Text>Facturación</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/users/customer" className={LinkClassName} activeClassName={LinkActiveClassName} exact>
                <Icon className="material-icons">people</Icon>
                <Text>Usuarios</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/disciplines" className={LinkClassName} activeClassName={LinkActiveClassName} exact>
                <Icon className="material-icons">pages</Icon>
                <Text>Disciplinas</Text>
              </Link>
            </Item>
            <Item>
              <Link to="/schedules" className={LinkClassName} activeClassName={LinkActiveClassName} exact>
                <Icon className="material-icons">today</Icon>
                <Text>Horarios</Text>
              </Link>
            </Item>
          </Items>
        </Sidebar>
        <Page>
          {this.props.children}
        </Page>
      </div>
    );
  }

  render() {
    return this.renderPages();
  }
}

export default App;
