const Event = require('./Event');

class Modules extends Event {
  algorithm = 'aes-192-cbc';
  encoding = 'sha256';
  salt = 'salt';
  ivLen = 16;
  saltRange = 24;
  passrange = 100;

  publicKeyExportWebType = 'spki';
  publicKeyExportType = 'pkcs1';
  publicKeyExportFormat = 'pem';

  privateKeyExportType = 'pkcs1';
  privateKeyExportFormat = 'pem';

  privateKeyCipherServer = 'aes-256-cbc';
  serverKeysAlgorithm = 'RSA-OAEP';
  modulusLength = 2048;
  serverKeyHash = 'SHA-256';
  publicExponent = new Uint8Array([0, 1, 0]);

  http = require('http');
  https = require('https');
  fs = require('fs');
  os = require('os');
  process = require('process');
  express = require('express')();
  crypto = require('crypto');
  Validator = require('../http/Validator');
  nodeMailer = require('nodemailer');
  mimeTypes = require('mime-types');

  constructor() { super(); }
}

module.exports = Modules;