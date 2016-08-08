'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pageCtrlStub = {
  index: 'pageCtrl.index',
  show: 'pageCtrl.show',
  create: 'pageCtrl.create',
  update: 'pageCtrl.update',
  destroy: 'pageCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pageIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './page.controller': pageCtrlStub
});

describe('Page API Router:', function() {

  it('should return an express router instance', function() {
    expect(pageIndex).to.equal(routerStub);
  });

  describe('GET /api/pages', function() {

    it('should route to page.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pageCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/pages/:id', function() {

    it('should route to page.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pageCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/pages', function() {

    it('should route to page.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pageCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/pages/:id', function() {

    it('should route to page.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pageCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/pages/:id', function() {

    it('should route to page.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pageCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/pages/:id', function() {

    it('should route to page.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pageCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
