"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const react_dom_1 = (0, tslib_1.__importDefault)(require("react-dom"));
const appRoot = document.getElementById('root');
appRoot === null || appRoot === void 0 ? void 0 : appRoot.insertAdjacentHTML('afterend', '<div id="modal-root"></div>');
const modalRoot = document.getElementById('modal-root');
class InnerModal extends react_1.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        modalRoot === null || modalRoot === void 0 ? void 0 : modalRoot.appendChild(this.el);
    }
    componentWillUnmount() {
        modalRoot === null || modalRoot === void 0 ? void 0 : modalRoot.removeChild(this.el);
    }
    render() {
        return react_dom_1.default.createPortal(<div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
        {this.props.children}
      </div>, this.el);
    }
}
class Modal extends react_1.Component {
    render() {
        if (this.props.visible) {
            return <InnerModal {...this.props}/>;
        }
        return null;
    }
}
exports.Modal = Modal;
