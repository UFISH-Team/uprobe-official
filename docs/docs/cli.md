# Command Line Interface

U-Probe provides a comprehensive command-line interface (CLI) for all probe design operations. This reference covers all available commands and their options.

## Overview

After installation, U-Probe is available via the `uprobe` command. The CLI is organized into subcommands, each handling a specific aspect of the probe design workflow.


```bash
uprobe [OPTIONS] COMMAND [ARGS]...
```

## Global Options

These options are available for all commands:

**`--version`**

   Show the U-Probe version and exit.

**`--verbose, -v`**

   Enable verbose logging. Shows detailed progress information.

**`--quiet, -q  `**

   Suppress all output except errors. Useful for scripting.

**`--help`**

   Show help message and exit.

Example:
```

bash
uprobe --version
uprobe --verbose run --help
uprobe --quiet validate-targets -p protocol.yaml -g genomes.yaml
```

## Commands Overview

| Command | Description |
|---------|-------------|
| `run` | Execute the complete probe design workflow |
| `build-index` | Build genome indices for alignment tools |
| `validate-targets` | Validate target genes against genome annotation |
| `generate-targets` | Generate target region sequences from genome |
| `construct-probes` | Construct probes from target sequences |
| `post-process` | Add attributes and apply filters to probes |
| `generate-barcodes` | Generate DNA barcode sequences |
| `version` | Show version information |

## run

Execute the complete probe design workflow from start to finish.


```bash
uprobe run [OPTIONS]
```

This command runs the entire pipeline:

1. Build genome indices (if needed)
2. Validate target genes  
3. Generate target sequences
4. Construct probes
5. Add quality attributes
6. Apply filters
7. Save results

**Options:**

**`--protocol, -p PATH`**

   **Required.** Path to probe design protocol configuration file (YAML).

**`--genomes, -g PATH`**

   **Required.** Path to genome configuration file (YAML).

**`--output, -o PATH`**

   Output directory. Default: `./results`

**`--raw`**

   Save unfiltered raw probe data in addition to filtered results.

**`--continue-invalid`**

   Continue execution even if some targets are invalid.

**`--threads, -t INTEGER`**

   Number of threads for computation. Default: `10`

**Examples:**
```

bash
# Basic run
uprobe run -p protocol.yaml -g genomes.yaml

# With custom output and threading
uprobe run -p protocol.yaml -g genomes.yaml -o my_results/ -t 8

# Save raw data and continue with invalid targets
uprobe run -p protocol.yaml -g genomes.yaml --raw --continue-invalid
```

## build-index

Build genome indices for alignment tools (Bowtie2, BLAST).


```bash
uprobe build-index [OPTIONS]
```

This command creates the necessary index files for sequence alignment and similarity searches. Indices are built based on the `align_index` specification in the genome configuration.

**Options:**

**`--protocol, -p PATH`**

   **Required.** Path to protocol configuration file. Used to determine which genome to index.

**`--genomes, -g PATH`**

   **Required.** Path to genome configuration file.

**`--threads, -t INTEGER`**

   Number of threads for index building. Default: `10`

**Examples:**
```

bash
# Build indices with default settings
uprobe build-index -p protocol.yaml -g genomes.yaml

# Use more threads for faster building
uprobe build-index -p protocol.yaml -g genomes.yaml -t 16
```

## validate-targets

Validate target genes against the genome annotation file.


```bash
uprobe validate-targets [OPTIONS]
```

This command checks if all target genes specified in the protocol exist in the GTF annotation file. It's useful for catching typos or missing genes before running the full workflow.

**Options:**

**`--protocol, -p PATH`**

   **Required.** Path to protocol configuration file.

**`--genomes, -g PATH  `**

   **Required.** Path to genome configuration file.

**`--continue-invalid`**

   Continue with valid targets even if some are invalid. Without this flag, the command fails if any targets are invalid.

**Examples:**
```

bash
# Validate all targets (fail if any invalid)
uprobe validate-targets -p protocol.yaml -g genomes.yaml

# Continue with valid targets only
uprobe validate-targets -p protocol.yaml -g genomes.yaml --continue-invalid
```

**Exit Codes:**

- `0`: All targets are valid
- `1`: Some targets are invalid (without --continue-invalid)

## generate-targets

Generate target region sequences from the genome.


```bash
uprobe generate-targets [OPTIONS]
```

This command extracts target sequences based on the extraction parameters in the protocol configuration. It produces a CSV file with target regions that can be used for probe construction.

**Options:**

**`--protocol, -p PATH`**

   **Required.** Path to protocol configuration file.

**`--genomes, -g PATH`**

   **Required.** Path to genome configuration file.

**`--output, -o PATH`**

   Output directory. Default: `./results`

**`--continue-invalid`**

   Continue with valid targets even if some are invalid.

**Output:**

Creates `target_sequences.csv` in the output directory with columns:

- `gene_name`: Target gene identifier
- `gene_id`: Gene ID from GTF
- `target_region`: Extracted genomic sequence
- `chromosome`: Chromosome location
- `start`: Start coordinate
- `end`: End coordinate
- `strand`: Strand orientation

**Examples:**
```

bash
# Generate targets with default output
uprobe generate-targets -p protocol.yaml -g genomes.yaml

# Custom output directory
uprobe generate-targets -p protocol.yaml -g genomes.yaml -o target_seqs/
```

## construct-probes

Construct probes from target sequences.


```bash
uprobe construct-probes [OPTIONS]
```

This command takes target sequences and constructs probes according to the probe design specifications in the protocol. It requires a target sequences CSV file from the previous step.

**Options:**

**`--protocol, -p PATH`**

   **Required.** Path to protocol configuration file.

**`--genomes, -g PATH`**

   **Required.** Path to genome configuration file.

**`--targets PATH`**

   **Required.** Path to target sequences CSV file (from generate-targets).

**`--output, -o PATH`**

   Output directory. Default: `./results`

**Output:**

Creates `constructed_probes.csv` with target data plus designed probe sequences.

**Examples:**
```

bash
# Construct probes from targets
uprobe construct-probes -p protocol.yaml -g genomes.yaml \
  --targets results/target_sequences.csv

# With custom output
uprobe construct-probes -p protocol.yaml -g genomes.yaml \
  --targets targets.csv -o probe_results/
```

## post-process

Add quality attributes and apply filters to probes.


```bash
uprobe post-process [OPTIONS]
```

This command adds quality attributes (GC content, melting temperature, etc.) to probes and applies filtering criteria specified in the protocol.

**Options:**

**`--protocol, -p PATH`**

   **Required.** Path to protocol configuration file.

**`--genomes, -g PATH`**

   **Required.** Path to genome configuration file.

**`--probes PATH`**

   **Required.** Path to probe data CSV file (combined targets and probes).

**`--output, -o PATH`**

   Output directory. Default: `./results`

**`--raw`**

   Save unfiltered raw probe data before applying filters.

**Output:**

Creates timestamped CSV files:

- `{experiment_name}_{timestamp}.csv`: Filtered probes
- `{experiment_name}_{timestamp}_raw.csv`: Raw probes (if --raw used)

**Examples:**
```

bash
# Post-process with filtering
uprobe post-process -p protocol.yaml -g genomes.yaml \
  --probes combined_data.csv

# Save raw data too
uprobe post-process -p protocol.yaml -g genomes.yaml \
  --probes combined_data.csv --raw
```

## generate-barcodes

Generate DNA barcode sequences.


```bash
uprobe generate-barcodes [OPTIONS]
```

This command generates barcode sequences based on the encoding configuration in the protocol. Useful for creating standardized barcode sets.

**Options:**

**`--protocol, -p PATH`**

   **Required.** Path to protocol configuration file.

**`--output, -o PATH`**

   Output directory for barcode files. Default: `./barcodes`

**Output:**

Creates barcode files in the specified output directory.

**Examples:**
```

bash
# Generate barcodes
uprobe generate-barcodes -p protocol.yaml

# Custom output directory
uprobe generate-barcodes -p protocol.yaml -o my_barcodes/
```

## version

Show the U-Probe version information.


```bash
uprobe version
```

**Example:**
```

bash
$ uprobe version
U-Probe version 1.0.0
```

## Workflow Examples

### Complete Workflow

Run everything with one command:


```bash
uprobe run \
  --protocol experiment.yaml \
  --genomes genomes.yaml \
  --output results/ \
  --threads 8 \
  --raw \
  --verbose
```

### Step-by-Step Workflow

For more control, run individual steps:
```

bash
# 1. Validate configuration
uprobe validate-targets -p experiment.yaml -g genomes.yaml

# 2. Build indices (if needed)
uprobe build-index -p experiment.yaml -g genomes.yaml -t 8

# 3. Generate target sequences
uprobe generate-targets -p experiment.yaml -g genomes.yaml -o results/

# 4. Construct probes
uprobe construct-probes \
  -p experiment.yaml \
  -g genomes.yaml \
  --targets results/target_sequences.csv \
  -o results/

# 5. Add attributes and filter
uprobe post-process \
  -p experiment.yaml \
  -g genomes.yaml \
  --probes results/constructed_probes.csv \
  -o results/ \
  --raw

# 6. Generate barcodes (optional)
uprobe generate-barcodes -p experiment.yaml -o barcodes/
```

### Parallel Processing

For large datasets, use multiple threads:


```bash
# Use all available cores
uprobe run -p protocol.yaml -g genomes.yaml -t $(nproc)

# Or specify a specific number
uprobe run -p protocol.yaml -g genomes.yaml -t 16
```

### Batch Processing

Process multiple protocols:
```

bash
#!/bin/bash
for protocol in protocols/*.yaml; do
  name=$(basename "$protocol" .yaml)
  uprobe run -p "$protocol" -g genomes.yaml -o "results/$name/"
done
```

## Debugging and Troubleshooting

### Verbose Output

Use verbose mode to see detailed progress:


```bash
uprobe --verbose run -p protocol.yaml -g genomes.yaml
```

### Check Intermediate Results

Save raw data to inspect intermediate steps:
```

bash
uprobe run -p protocol.yaml -g genomes.yaml --raw
```

### Validate Before Running

Always validate targets first:


```bash
uprobe validate-targets -p protocol.yaml -g genomes.yaml
# Only run full workflow if validation passes
```

### Test with Subset

Test your configuration with a small subset of targets:
```

yaml
# Create test_protocol.yaml with fewer targets
targets:
  - "GAPDH"  # Just one target for testing
```


```bash
uprobe run -p test_protocol.yaml -g genomes.yaml
```

## Performance Optimization

### Index Building

Build indices once and reuse:
```

bash
# Build indices once
uprobe build-index -p protocol.yaml -g genomes.yaml -t 16

# Then run multiple experiments without rebuilding
uprobe run -p exp1.yaml -g genomes.yaml  # Reuses existing indices
uprobe run -p exp2.yaml -g genomes.yaml
```

### Memory Usage

For large genomes, monitor memory usage:


```bash
# Monitor memory during execution
uprobe --verbose run -p protocol.yaml -g genomes.yaml &
watch -n 5 'ps aux | grep uprobe'
```

### Storage Considerations
```

bash
# Check available space before running
df -h /path/to/output/

# Clean up intermediate files if needed
rm -f *.tmp *.intermediate
```

## Exit Codes

U-Probe uses standard exit codes:

- `0`: Success
- `1`: General error (invalid configuration, missing files, etc.)
- `2`: Command-line argument error

## Integration with Scripts

### Shell Scripts


```bash
#!/bin/bash
set -e  # Exit on any error

# Configuration
PROTOCOL="my_experiment.yaml"
GENOMES="genomes.yaml" 
OUTPUT="results_$(date +%Y%m%d)"

# Run U-Probe
echo "Starting probe design..."
uprobe run \
  --protocol "$PROTOCOL" \
  --genomes "$GENOMES" \
  --output "$OUTPUT" \
  --threads 8 \
  --verbose

echo "Results saved to $OUTPUT"
```

### Python Scripts
```

python
import subprocess
import sys

def run_uprobe(protocol, genomes, output):
    cmd = [
        'uprobe', 'run',
        '--protocol', protocol,
        '--genomes', genomes, 
        '--output', output,
        '--verbose'
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        sys.exit(1)
        
    return result.stdout

# Usage
output = run_uprobe('protocol.yaml', 'genomes.yaml', 'results/')
print("Success:", output)
```

## Next Steps

Now that you know the CLI commands:

1. Learn about the [python_api](./python_api.md) for programmatic access
2. Check out [examples](./examples.md) for real-world applications
3. Refer to [troubleshooting](./troubleshooting.md) if you encounter issues

::: tip Tip
Use `uprobe COMMAND --help` to get detailed help for any specific command. The help includes all options and examples.

:::