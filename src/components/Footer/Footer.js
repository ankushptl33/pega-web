import React, { Component } from 'react';
import { Link } from 'react-router-dom';

 /* THIS IS FOOTER COMPOENT
  ================================================================ */
const Footer = props => <div>{props.copyright}</div>;

 /* DEFAULT PROPS
  ================================================================ */
Footer.defaultProps = {
  copyright: `© ${new Date().getFullYear()}, FIGmd, Inc. USA. All rights reserved.`,
};
export default Footer;
