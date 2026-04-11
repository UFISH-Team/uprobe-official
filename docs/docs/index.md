# 🧬 U-Probe: Universal Probe Design Tool

[![License](https://img.shields.io/github/license/UFISH-Team/U-Probe)](https://github.com/UFISH-Team/U-Probe/blob/main/LICENSE)

[![Python Version](https://img.shields.io/badge/python-3.8+-blue)](https://www.python.org/downloads/)

[![Documentation Status](https://readthedocs.org/projects/uprobe/badge/?version=latest)](https://uprobe.readthedocs.io/en/latest/?badge=latest)

**U-Probe** is a powerful and flexible Python-based tool for designing custom DNA or RNA probes for various molecular biology applications, such as *in situ* hybridization and targeted sequencing. It provides a comprehensive workflow from target gene selection to final probe generation, with a focus on automation, customization, and ease of use.

::: info Note
U-Probe is developed by the UFISH Team and is actively maintained. For the latest updates and source code, visit our [GitHub repository](https://github.com/UFISH-Team/U-Probe).
:::

## Key Features

✨ **End-to-end workflow**: Automates the entire probe design process, from sequence extraction to final filtering.

⚙️ **Highly customizable**: Use simple YAML configuration files to define target genes, probe structures, and filtering criteria.

🔍 **Advanced filtering**: Filter probes based on a wide range of attributes like GC content, melting temperature (Tm), and off-target potential.

🔌 **Extensible API**: In addition to a command-line interface, U-Probe offers a clean Python API for programmatic access and integration into other bioinformatics pipelines.

🗃️ **Built-in indexing**: Automatically handles the creation of genome indices for alignment tools like Bowtie2 and BLAST.

## Quick Start

Install U-Probe with pip:


```bash
pip install uprobe

```

Run a complete probe design workflow:


```bash
uprobe run --protocol protocol.yaml --genomes genomes.yaml --output results/

```

For detailed installation instructions and usage examples, see the [installation](./installation.md) and [quickstart](./quickstart.md) guides.

## Documentation Contents





### Getting Started

New to U-Probe? Start here:

* [installation](./installation.md) - Install U-Probe on your system
* [quickstart](./quickstart.md) - Get up and running in minutes
* [configuration](./configuration.md) - Learn about configuration files

### User Guide

Learn how to use U-Probe effectively:

* [cli](./cli.md) - Command-line interface reference
* [python_api](./python_api.md) - Python API guide
* [workflows](./workflows.md) - Common workflows and best practices
* [examples](./examples.md) - Real-world examples and tutorials

### Reference

Detailed reference documentation:

* [api_reference](./api_reference.md) - Complete API documentation
* [config_reference](./config_reference.md) - Configuration file reference
* [troubleshooting](./troubleshooting.md) - Common issues and solutions
* [faq](./faq.md) - Frequently asked questions

## Community & Support


## License

U-Probe is released under the MIT License. See the [LICENSE](https://github.com/UFISH-Team/U-Probe/blob/main/LICENSE) file for details.

