CRD2Pulumi is a tool that converts Kubernetes Custom Resource Definitions (CRDs) into Pulumi component resources. This enables you to manage custom Kubernetes resources using Pulumi's infrastructure as code approach.

## Features

- Parses Kubernetes CRD YAML files.
- Generates Pulumi component resource code in supported languages.
- Simplifies integration of custom resources into Pulumi projects.

## Getting Started

1. **Clone the repository:**
  ```sh
  git clone https://github.com/your-org/crd2pulumi.git
  cd crd2pulumi
  ```

2. **Install dependencies:**
  ```sh
  # Example for Node.js projects
  npm install
  ```

3. **Usage:**
  ```sh
  ./crd2pulumi <path-to-crd.yaml> --language <language>
  ```

## Example

Convert a CRD YAML to a Pulumi TypeScript component:
```sh
./crd2pulumi ./my-crd.yaml --language typescript
```

## Requirements

- Docker (optional, for containerized usage)
- Node.js (if using the JavaScript/TypeScript generator)
- Python (if using the Python generator)

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.