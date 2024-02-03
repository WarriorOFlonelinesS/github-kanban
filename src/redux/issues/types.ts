export type TStatus = "open" | "closed";
export type TUserType = "User" | 'Admin';

export type TIssue = {
    dataSource:any
    data:any;
    "url": string,
    "repository_url": string,
    "labels_url": string,
    "comments_url": string,
    "events_url": string,
    "html_url": string,
    "id": number,
    "node_id": string,
    "number": number,
    "title": string,
    "user": {
        "login": string,
        "id": number,
        "node_id": string,
        "avatar_url": string,
        "gravatar_id": "",
        "url": string,
        "html_url": string,
        "followers_url": string,
        "following_url": string,
        "gists_url": string,
        "starred_url": string,
        "subscriptions_url": string,
        "organizations_url": string,
        "repos_url": string,
        "events_url": string,
        "received_events_url": string,
        "type": TUserType,
        "site_admin": boolean
    },
    "labels": [
        {
            "id": number,
            "node_id": string,
            "url": string,
            "name": string,
            "color": string,
            "default": boolean,
            "description": string,
        }
    ],
    "state": TStatus,
    "locked": boolean,
    "assignee": null | string,
    "assignees": Array<string>
    "milestone": string,
    "comments": number,
    "created_at": Date,
    "updated_at": Date,
    "closed_at"?:  Date,
    "author_association": string,
    "active_lock_reason"?: string,
    "draft": boolean,
    "pull_request": {
        "url": string
        "html_url": string
        "diff_url": string
        "patch_url":  string
        "merged_at"?:  Date,
    },
    "body": string,
    "reactions": {
        "url": string
        "total_count": number,
        "+1": number,
        "-1": number,
        "laugh": number,
        "hooray": number,
        "confused": number,
        "heart": number,
        "rocket": number,
        "eyes": number,
    },
    "timeline_url": string
    "performed_via_github_app": null | string,
    "state_reason": null | string,
}

export type TIssuesState = {
    openIssues: any[];
    allIssues: any[];
    closedIssues: any[];
    toDo: Array<TIssue>,
    inProgress: Array<TIssue>,
    closed: Array<TIssue>,
    isLoading: boolean,
};

export type TGetAllIssuesSuccess = {
    data: Array<TIssue>,
}