# Configuration Files

U-Probe uses two main YAML configuration files to define your probe design workflow. This guide explains the structure, allowed fields, and constraints for both configuration files.

## Overview

U-Probe requires two configuration files:

1. **genomes.yaml** - Defines reference genomes, annotations, and index paths.
2. **protocol.yaml** - Defines probe design parameters, targets, structure, and filtering workflow.

::: tip Auto-Completion Feature
If you omit the `attributes` and `post_process` sections in your `protocol.yaml`, U-Probe's AI Agent or core engine will **automatically generate** sensible default attributes and filtering conditions based on whether you are in RNA mode or DNA mode. For beginners, you only need to write `targets`, `extracts`, and `probes`.
:::

---

## Genomes Configuration (genomes.yaml)

The genomes configuration file maps genome names to their file paths and indexing options.

### Structure & Fields

```yaml
genome_name:
  description: "Human readable description"
  species: "Species name"
  fasta: "/path/to/genome.fa"
  gtf: "/path/to/annotation.gtf"
  align_index:
    - bowtie2
  jellyfish: false
```

| Field | Type | Required | Description & Constraints |
|-------|------|----------|---------------------------|
| `fasta` | String | **Yes** | Absolute or relative path to the genome FASTA file. |
| `gtf` | String | **Yes** | Path to the gene annotation GTF file. Required for RNA mode target extraction. |
| `align_index` | List | No | List of aligners to build indices for. Currently supports `[bowtie2]`. |
| `jellyfish` | Boolean | No | Whether to build a Jellyfish k-mer index. Set to `true` if you plan to use `kmer_count` attributes (highly recommended for DNA mode). Default is `false`. |
| `description` | String | No | Human-readable description. |
| `species` | String | No | Scientific species name. |

---

## Protocol Configuration (protocol.yaml)

The protocol file defines the complete probe design workflow. U-Probe determines the design mode (RNA vs. DNA) based on the `extracts.target_region.source` field.

- **RNA Mode**: `source` is set to `exon`, `CDS`, `UTR`, or `gene`.
- **DNA Mode**: `source` is set to `genome`.

### 1. Basic Information & Targets

```yaml
name: "ExperimentName"
genome: "human_hg38"
targets:
  - "GAPDH"
  - "ACTB"
```

| Field | Type | Required | Description & Constraints |
|-------|------|----------|---------------------------|
| `name` | String | **Yes** | Unique name for your experiment. Used as a prefix for output files. |
| `genome` | String | **Yes** | Name of the genome to use. **Must exactly match** a key defined in `genomes.yaml`. |
| `targets` | List | **Yes** | List of target gene names (must exist in GTF) or custom sequences (e.g., `- CustomSeq1: "ATGC..."`). |

### 2. Target Extraction (`extracts`)

Defines how to extract target sequences from the genome.

```yaml
extracts:
  target_region:
    source: "exon"        # RNA mode: exon, CDS, UTR. DNA mode: genome.
    length: 40            # Length of each extracted region
    overlap: 20           # Overlap between adjacent regions
    # coordinates:        # Only allowed when source is "genome"
    #   - "chr1:1000000-1002000"
```

| Field | Type | Required | Description & Constraints |
|-------|------|----------|---------------------------|
| `source` | String | **Yes** | **RNA Mode**: `exon`, `CDS`, `UTR`, `gene`.<br>**DNA Mode**: `genome`. |
| `length` | Integer | **Yes** | Length of each target region in base pairs. |
| `overlap` | Integer | **Yes** | Overlap between adjacent extracts in base pairs (must be `< length`). |
| `coordinates` | List | No | **Only allowed in DNA mode** (`source: genome`). Specifies exact genomic coordinates to extract (e.g., `chr1:1000-2000`). |

### 3. Probe Design (`probes`)

Defines probe structure and composition using a declarative template. You can define multiple probes or probe parts.

```yaml
probes:
  fish_probe:
    template: "{spacer}{binding}{barcode}"
    parts:
      spacer:
        expr: "'TTTTTT'"
      binding:
        length: 40
        expr: "rc(target_region)"
      barcode:
        expr: "encoding[target]['fluorophore']"
```

| Field | Type | Required | Description & Constraints |
|-------|------|----------|---------------------------|
| `template` | String | **Yes** | Defines the overall structure using part names enclosed in braces `{}`. |
| `parts` | Dict | **Yes** | Defines each part referenced in the template. |
| `length` | Integer | No | Expected length of the part. If provided, U-Probe will validate the generated sequence length. |
| `expr` | String | **Yes** | Python-like expression to generate the sequence. |

**Allowed `expr` Syntax:**
- Direct sequence slicing: `"target_region[0:20]"`
- Reverse complement: `"rc(target_region)"`
- Fixed sequences: `"'ACGTACGT'"` (Must be wrapped in single quotes inside the double quotes)
- Barcode lookup: `"encoding[target]['BC1']"`
- Fixed spacer sequence: `"'TTTTTTTT'"`

### 4. Encoding System (`encoding`)

Maps genes to barcodes, fluorophores, or other identifiers referenced in `expr`.

```yaml
encoding:
  GAPDH:
    fluorophore: "ACGTACGTACGTACGT"
  ACTB:
    fluorophore: "TGCATGCATGCATGCA"
```

### 5. Quality Attributes (`attributes`)

Defines quality metrics to calculate for probes or target regions. If omitted, U-Probe auto-generates them.

```yaml
attributes:
  probe_gc:
    target: fish_probe
    type: gc_content
  probe_tm:
    target: fish_probe
    type: annealing_temperature
  target_specificity:
    target: target_region
    type: mapped_genes
    aligner: bowtie2
    min_mapq: 30
```

| Field | Type | Required | Description & Constraints |
|-------|------|----------|---------------------------|
| `target` | String | **Yes** | The name of the probe, probe part, or `target_region` to calculate the attribute for. |
| `type` | String | **Yes** | The type of attribute to calculate (see supported types below). |
| `aligner` | String | No | Required for specificity types (`mapped_genes`, `mapped_sites`, `kmer_count`). |

**Supported Attribute Types:**

| Type | Description | Mode | Additional Required/Optional Fields |
|------|-------------|------|-------------------------------------|
| `gc_content` | GC content ratio (0.0 to 1.0) | Both | None |
| `annealing_temperature` | Melting temperature (Tm) in Celsius | Both | None |
| `fold_score` | Secondary structure MFE (ViennaRNA) | Both | None |
| `self_match` | Self-complementarity score | Both | None |
| `target_fold_score` | RNA fold MFE for target region | Both | None |
| `target_blocks` | RNA fold blocks for target region | Both | None |
| `mapped_genes` | Number of genes with significant alignment | **RNA** | `aligner: bowtie2`, `min_mapq` (default: 30) |
| `mapped_sites` | Specific genomic alignment sites | **DNA** | `aligner: bowtie2` |
| `kmer_count` | K-mer abundance in the genome | **DNA** | `aligner: jellyfish`, `kmer_len` (default: 35), `size` (default: 1G) |

### 6. Post-Processing (`post_process`)

Defines filtering, sorting, and spacing criteria. If omitted, U-Probe auto-generates default filters based on the calculated attributes.

```yaml
post_process:
  filters:
    probe_gc:
      condition: "probe_gc >= 0.4 & probe_gc <= 0.6"
    probe_tm:
      condition: "probe_tm >= 50 & probe_tm <= 65"
  
  sorts:
    is_ascending:
      - "probe_selfmatch"
    is_descending:
      - "probe_tm"
      
  remove_overlap:
    location_interval: 25
```

| Section | Description & Constraints |
|---------|---------------------------|
| `filters` | Dict of conditions using pandas-style boolean expressions (e.g., `condition: "gc >= 0.4 & gc <= 0.6"`). The keys must match the attribute names defined in `attributes`. |
| `sorts` | Defines sorting priorities. Contains `is_ascending` and `is_descending` lists of attribute names. |
| `remove_overlap` | Dict. Removes physically overlapping probes. Requires `location_interval` (Integer). |
| `equal_space` | Dict. Downsamples probes to a desired count evenly across the target. Requires `num_probes` (Integer). |
| `avoid_otp` | Dict. **DNA mode only**. Avoids off-target peaks. |