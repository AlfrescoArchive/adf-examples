

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AlfrescoAuthenticationService, AppConfigService, BpmProductVersionModel, DiscoveryApiService, EcmProductVersionModel  } from 'ng2-alfresco-core';
import { ObjectDataTableAdapter } from 'ng2-alfresco-datatable';

@Component({
    selector: 'adf-about-page',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    data: ObjectDataTableAdapter;
    status: ObjectDataTableAdapter;
    license: ObjectDataTableAdapter;
    modules: ObjectDataTableAdapter;
    githubUrlCommitAlpha: string = 'https://github.com/Alfresco/alfresco-ng2-components/commits/';

    configFile: string = 'app.config.json';
    ecmHost: string = '';
    bpmHost: string = '';

    ecmVersion: EcmProductVersionModel = null;
    bpmVersion: BpmProductVersionModel = null;

    constructor(private http: Http,
                private appConfig: AppConfigService,
                private authService: AlfrescoAuthenticationService,
                private discovery: DiscoveryApiService) {
    }

    ngOnInit() {

        if (this.authService.isEcmLoggedIn()) {
            this.discovery.getEcmProductInfo().subscribe((ecmVers) => {
                this.ecmVersion = ecmVers;

                this.modules = new ObjectDataTableAdapter(this.ecmVersion.modules, [
                    {type: 'text', key: 'id', title: 'ID', sortable: true},
                    {type: 'text', key: 'title', title: 'Title', sortable: true},
                    {type: 'text', key: 'version', title: 'Description', sortable: true},
                    {type: 'text', key: 'installDate', title: 'Install Date', sortable: true},
                    {type: 'text', key: 'installState', title: 'Install State', sortable: true},
                    {type: 'text', key: 'versionMin', title: 'Version Minor', sortable: true},
                    {type: 'text', key: 'versionMax', title: 'Version Max', sortable: true}
                ]);

                this.status = new ObjectDataTableAdapter([this.ecmVersion.status], [
                    {type: 'text', key: 'isReadOnly', title: 'ReadOnly', sortable: true},
                    {type: 'text', key: 'isAuditEnabled', title: 'Is Audit Enable', sortable: true},
                    {type: 'text', key: 'isQuickShareEnabled', title: 'Is quick shared enable', sortable: true},
                    {type: 'text', key: 'isThumbnailGenerationEnabled', title: 'Thumbnail Generation', sortable: true}
                ]);

                this.license = new ObjectDataTableAdapter([this.ecmVersion.license], [
                    {type: 'text', key: 'issuedAt', title: 'Issued At', sortable: true},
                    {type: 'text', key: 'expiresAt', title: 'Expires At', sortable: true},
                    {type: 'text', key: 'remainingDays', title: 'Remaining Days', sortable: true},
                    {type: 'text', key: 'holder', title: 'Holder', sortable: true},
                    {type: 'text', key: 'mode', title: 'Is Cluster Enabled', sortable: true},
                    {type: 'text', key: 'isClusterEnabled', title: 'Is Cluster Enabled', sortable: true},
                    {type: 'text', key: 'isCryptodocEnabled', title: 'Is Cryptodoc Enable', sortable: true}
                ]);
            });
        }

        if (this.authService.isBpmLoggedIn()) {
            this.discovery.getBpmProductInfo().subscribe((bpmVers) => {
                this.bpmVersion = bpmVers;
            });
        }

        this.http.get('/versions.json').subscribe(response => {
            let regexp = new RegExp('^(ng2-activiti|ng2-alfresco|alfresco-)');

            let alfrescoPackages = Object.keys(response.json().dependencies).filter((val) => {
                return regexp.test(val);
            });

            let alfrescoPackagesTableRepresentation = [];
            alfrescoPackages.forEach((val) => {
                alfrescoPackagesTableRepresentation.push({
                    name: val,
                    version: response.json().dependencies[val].version
                });
            });

            this.gitHubLinkCreation(alfrescoPackagesTableRepresentation);

            this.data = new ObjectDataTableAdapter(alfrescoPackagesTableRepresentation, [
                {type: 'text', key: 'name', title: 'Name', sortable: true},
                {type: 'text', key: 'version', title: 'Version', sortable: true}
            ]);
        });

        this.ecmHost = this.appConfig.get<string>('ecmHost');
        this.bpmHost = this.appConfig.get<string>('bpmHost');
    }

    private gitHubLinkCreation(alfrescoPackagesTableRepresentation): void {
        let corePackage = alfrescoPackagesTableRepresentation.find((packageUp) => {
            return packageUp.name === 'ng2-alfresco-core';
        });

        if (corePackage) {
            let commitIsh = corePackage.version.split('-');
            if (commitIsh.length > 1) {
                this.githubUrlCommitAlpha = this.githubUrlCommitAlpha + commitIsh[1];
            } else {
                this.githubUrlCommitAlpha = this.githubUrlCommitAlpha + corePackage.version;
            }
        }
    }
}
