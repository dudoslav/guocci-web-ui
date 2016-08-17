import { describe, expect, beforeEach, it, inject, beforeEachProviders } from '@angular/core/testing';
import { provide } from '@angular/core';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { SiteService } from './site.service';

import { Site } from './site';
import { Appliance } from './appliance';
import { Flavour } from './flavour';
import { Instance } from './instance';

import { Credential } from '../user/credential';

describe('SiteService', () => {
  let mockBackend: MockBackend;
  let service: SiteService;

  beforeEachProviders(() => [
    provide('webApiBaseUrl', { useValue: 'TODO: delete this' }),
    SiteService,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
      deps: [ MockBackend, BaseRequestOptions ]
    })
  ]);

  beforeEach(inject([ MockBackend, SiteService ], (_mockBackend: MockBackend, _service: SiteService) => {
    mockBackend = _mockBackend;
    service = _service;
  }));

  afterEach(() => mockBackend.verifyNoPendingRequests());

  describe('Site', () => {

    it('should fetch sites', () => {
      let response = [
        { id: 1, name: 'site1', country: 'russia', endpoint: 'cloud.ru' },
        { id: 2, name: 'site2', country: 'usa', endpoint: 'cloud.us' },
        { id: 3, name: 'site3', country: 'england', endpoint: 'cloud.en' }
      ];
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: response })));
      });
      service.getSites().subscribe(res => {
        let sites: Site[] = res;
        expect(sites.length).toBe(3);
        sites.forEach((site, index) => {
          expect(site.id).toBe(response[index].id);
          expect(site.name).toBe(response[index].name);
          expect(site.country).toBe(response[index].country);
          expect(site.endpoint).toBe(response[index].endpoint);
        });
      });
    });

    it('should fetch site', () => {
      let response = { id: 1, name: 'site1', country: 'russia', endpoint: 'cloud.ru' };
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: response })));
      });
      service.getSite(1).subscribe(res => {
        let site: Site = res;
        expect(site.id).toBe(1);
        expect(site.name).toBe('site1');
        expect(site.country).toBe('russia');
        expect(site.endpoint).toBe('cloud.ru');
      });
    });

  });

  describe('Appliance', () => {

    it('should fetch appliances', () => {
      let response = [
        { id: 1, name: 'windows 10', mpuri: 'microsoft.com', vo: 'microsoft' },
        { id: 1, name: 'doors 11', mpuri: 'makrohard.ru', vo: 'makrohard' }
      ];
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: response })));
      });
      service.getAppliancesOnSite(1).subscribe(res => {
        let appliances: Appliance[] = res;
        expect(appliances.length).toBe(2);
        appliances.forEach((appliance, index) => {
          expect(appliance.id).toBe(response[index].id);
          expect(appliance.name).toBe(response[index].name);
          expect(appliance.mpuri).toBe(response[index].mpuri);
          expect(appliance.vo).toBe(response[index].vo);
        });
      });
    });

    it('should fetch appliance', () => {
      let response = { id: 1, name: 'doors 11', mpuri: 'makrohard.ru', vo: 'makrohard' };
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: response })));
      });
      service.getApplianceOnSite(1, 1).subscribe(res => {
        let appliance: Appliance = res;
        expect(appliance.id).toBe(1);
        expect(appliance.name).toBe('doors 11');
        expect(appliance.mpuri).toBe('makrohard.ru');
        expect(appliance.vo).toBe('makrohard');
      });
    });

  });

  describe('Flavour', () => {

    it('should fetch flavours', () => {
      let response = [
        {id: 1, name: 'intel', memory: 1024000, vcpu: 8, cpu: 4},
        {id: 2, name: 'amd', memory: 2048000, vcpu: 16, cpu: 16}
      ];
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: response })));
      });
      service.getFlavoursOnSite(1).subscribe(res => {
        let flavours: Flavour[] = res;
        expect(flavours.length).toBe(2);
        flavours.forEach((flavour, index) => {
          expect(flavour.id).toBe(response[index].id);
          expect(flavour.name).toBe(response[index].name);
          expect(flavour.memory).toBe(response[index].memory);
          expect(flavour.vcpu).toBe(response[index].vcpu);
          expect(flavour.cpu).toBe(response[index].cpu);
        });
      });
    });

    it('should fetch flavour', () => {
      let response = {id: 1, name: 'intel', memory: 1024000, vcpu: 8, cpu: 4};
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: response })));
      });
      service.getFlavourOnSite(1, 1).subscribe(res => {
        let flavour: Flavour = res;
        expect(flavour.id).toBe(1);
        expect(flavour.name).toBe('intel');
        expect(flavour.memory).toBe(1024000);
        expect(flavour.vcpu).toBe(8);
        expect(flavour.cpu).toBe(4);
      });
    });

  });

  describe('Instance', () => {

    it('should fetch instances', () => {
      let response = [
        { id: 1, name: 'myInstance', credentials: [ { id: 1, type: 'sshKey', value: 'ssh-rsa abba1337' } ], applianceId: 1, flavourId: 1, userData: '' },
        { id: 1, name: 'yourInstance', credentials: [ { id: 1, type: 'sshKey', value: 'ssh-rsa jasdfbjhasdf' } ], applianceId: 1, flavourId: 1, userData: '' }
      ];
      mockBackend.connections.subscribe((conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: response })));
      });
      service.getInstancesOnSite(1).subscribe(res => {
        let instances: Instance[] = res;
        expect(instances.length).toBe(2);
        instances.forEach((instance, index) => {
          expect(instance.id).toBe(response[index].id);
          expect(instance.name).toBe(response[index].name);
          expect(instance.applianceId).toBe(response[index].applianceId);
          expect(instance.flavourId).toBe(response[index].flavourId);
          expect(instance.userData).toBe(response[index].userData);
          instance.credentials.forEach((credential, jindex) => {
            expect(credential.id).toBe(response[index].credentials[jindex].id);
            expect(credential.type).toBe(response[index].credentials[jindex].type);
            expect(credential.value).toBe(response[index].credentials[jindex].value);
          });
        });
      });
    });

    it('should post instance', () => {
      let instance: Instance = new Instance();
      instance.applianceId = 1;
      instance.flavourId = 1;
      instance.userData = 'mc server';
      instance.name = 'Minecraft Server';
      let credentials: Credential[] = [];
      credentials.push(new Credential());
      credentials[0].id = 1;
      credentials[0].type = 'sshKey';
      credentials[0].value = 'ssh-rsa lolulu';
      instance.credentials = credentials;

      mockBackend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.method).toBe(1);
        expect(conn.request.getBody()).toBe(JSON.stringify(instance));
        let responseInstance = instance;
        responseInstance.id = 0;
        conn.mockRespond(new Response(new ResponseOptions({ body: responseInstance })));
      });

      service.createInstanceOnSite(1, instance).subscribe(res => {
        let responseInstance = res as Instance;
        expect(instance.id).toBe(responseInstance.id);
        expect(instance.name).toBe(responseInstance.name);
        expect(instance.applianceId).toBe(responseInstance.applianceId);
        expect(instance.flavourId).toBe(responseInstance.flavourId);
        expect(instance.userData).toBe(responseInstance.userData);
        instance.credentials.forEach((credential, index) => {
          expect(credential.id).toBe(responseInstance.credentials[index].id);
          expect(credential.type).toBe(responseInstance.credentials[index].type);
          expect(credential.value).toBe(responseInstance.credentials[index].value);
        });
      });
    });

  });

});
