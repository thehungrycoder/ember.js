import {get} from "ember-metal/property_get";
import EmberObject from "ember-runtime/system/object";

QUnit.module('system/core_object/reopen');

QUnit.test('adds new properties to subclass instance', function() {

  var Subclass = EmberObject.extend();
  Subclass.reopen({
    foo() { return 'FOO'; },
    bar: 'BAR'
  });

  equal(new Subclass().foo(), 'FOO', 'Adds method');
  equal(get(new Subclass(), 'bar'), 'BAR', 'Adds property');
});

QUnit.test('reopened properties inherited by subclasses', function() {

  var Subclass = EmberObject.extend();
  var SubSub = Subclass.extend();

  Subclass.reopen({
    foo() { return 'FOO'; },
    bar: 'BAR'
  });


  equal(new SubSub().foo(), 'FOO', 'Adds method');
  equal(get(new SubSub(), 'bar'), 'BAR', 'Adds property');
});

QUnit.test('allows reopening already instantiated classes', function() {
  var Subclass = EmberObject.extend();

  Subclass.create();

  Subclass.reopen({
    trololol: true
  });

  equal(Subclass.create().get('trololol'), true, "reopen works");
});
