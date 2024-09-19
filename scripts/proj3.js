// A constructor for an object that stores information about a resource.
const Source = (name, url, description, provider) => {
    this.name = name;
    this.url = url;
    this.description = description;
    this.provider = provider;
}

const resources = [];

const addSource = (name, url, desc, provider) => {
    resources.push(new Source(name, url, desc, provider));
}
