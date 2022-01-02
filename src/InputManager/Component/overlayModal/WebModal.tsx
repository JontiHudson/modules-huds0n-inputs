import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// create and get reference to Modal DOM node
const appRoot = document.getElementById('root');
appRoot?.insertAdjacentHTML('afterend', '<div id="modal-root"></div>');
const modalRoot = document.getElementById('modal-root');

type Props = {
  visible: boolean;
};

class InnerModal extends Component<Props> {
  el: HTMLDivElement;

  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot?.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot?.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div
        style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
      >
        {this.props.children}
      </div>,
      this.el,
    );
  }
}

export class Modal extends Component<Props> {
  render() {
    if (this.props.visible) {
      return <InnerModal {...this.props} />;
    }
    return null;
  }
}
