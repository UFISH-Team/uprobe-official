# Examples

This page provides complete, working examples for the two most common probe design scenarios: RNA FISH and DNA FISH.

## Example 1: Standard RNA FISH Probes

Design simple FISH probes for visualizing gene expression in RNA. This example targets exonic regions and uses Bowtie2 to ensure the probes map specifically to the target genes.

### Configuration Files

**genomes.yaml:**

```yaml
human_hg38:
  description: "Human genome GRCh38"
  species: "Homo sapiens"
  fasta: "/data/genomes/hg38/hg38.fa"
  gtf: "/data/genomes/hg38/gencode.v38.annotation.gtf"
  align_index:
    - bowtie2
  jellyfish: false
```

**rna_protocol.yaml:**

```yaml
name: "Basic_RNA_FISH"
genome: "human_hg38"

targets:
  - "GAPDH"
  - "ACTB"
  - "TP53"

extracts:
  target_region:
    source: "exon"
    length: 40
    overlap: 20

probes:
  fish_probe:
    template: "{spacer}{target_binding}{fluorophore_site}"
    parts:
      spacer:
        expr: "'TTTTTT'"
      target_binding:
        length: 40
        expr: "rc(target_region)"
      fluorophore_site:
        expr: "encoding[target]['fluorophore']"

encoding:
  GAPDH:
    fluorophore: "ACGTACGTACGTACGT"
  ACTB:
    fluorophore: "TGCATGCATGCATGCA"
  TP53:
    fluorophore: "CGATCGATCGATCGAT"

attributes:
  probe_gc:
    target: fish_probe
    type: gc_content
  probe_tm:
    target: fish_probe
    type: annealing_temperature
  probe_fold:
    target: fish_probe
    type: fold_score
  target_specificity:
    target: target_region
    type: mapped_genes
    aligner: bowtie2
    min_mapq: 30

post_process:
  filters:
    probe_gc:
      condition: "probe_gc >= 0.45 & probe_gc <= 0.55"
    probe_tm:
      condition: "probe_tm >= 50 & probe_tm <= 60"
    target_specificity:
      condition: "target_specificity <= 5"
  
  sorts:
    is_ascending:
      - "target_specificity"
      - "probe_fold"
    is_descending:
      - "probe_tm"
```

### Running the Example

```bash
# Complete workflow
uprobe run -p rna_protocol.yaml -g genomes.yaml -o rna_results/ --raw
```

### Expected Output

The results directory will contain:

- `Basic_RNA_FISH_YYYYMMDD_HHMMSS.csv` - Filtered probes
- `Basic_RNA_FISH_YYYYMMDD_HHMMSS_raw.csv` - All designed probes

Example output structure:
```text
target,target_region,fish_probe,probe_gc,probe_tm,target_specificity
GAPDH,ATGCGTACG...,TTTTTTCGTACGATACGTACGTACGTACGT,0.48,55.2,1
ACTB,CGATCGATA...,TTTTTTTATCGATCTGCATGCATGCATGCA,0.52,58.7,2
TP53,GCTAGCTAG...,TTTTTTCTAGCTACCGATCGATCGATCGAT,0.50,56.1,1
```

---

## Example 2: Standard DNA FISH Probes (Tiling)

Design genome-tiling DNA FISH probes for specific genomic coordinates. This example uses Jellyfish to filter out probes containing highly repetitive k-mers, ensuring high specificity for DNA targets.

### Configuration Files

**genomes.yaml:**

```yaml
human_hg38:
  description: "Human genome GRCh38"
  species: "Homo sapiens"
  fasta: "/data/genomes/hg38/hg38.fa"
  gtf: "/data/genomes/hg38/gencode.v38.annotation.gtf"
  align_index:
    - bowtie2
  jellyfish: true
```

**dna_protocol.yaml:**

```yaml
name: "Tiling_DNA_FISH"
genome: "human_hg38"

targets:
  - "TargetLocus1"

extracts:
  target_region:
    source: "genome"
    length: 120
    overlap: 60
    coordinates:
      - "chr1:1000000-1050000"

probes:
  dna_probe:
    template: "{target_binding}"
    parts:
      target_binding:
        length: 120
        expr: "rc(target_region)"

attributes:
  probe_gc:
    target: dna_probe
    type: gc_content
  probe_tm:
    target: dna_probe
    type: annealing_temperature
  probe_selfmatch:
    target: dna_probe
    type: self_match
  probe_kmer:
    target: dna_probe
    type: kmer_count
    aligner: jellyfish
    kmer_len: 35
    size: "1G"
    threads: 10
  probe_sites:
    target: dna_probe
    type: mapped_sites
    aligner: bowtie2

post_process:
  filters:
    probe_gc:
      condition: "probe_gc >= 0.4 & probe_gc <= 0.6"
    probe_tm:
      condition: "probe_tm >= 55 & probe_tm <= 75"
    probe_selfmatch:
      condition: "probe_selfmatch < 5"
    probe_kmer:
      condition: "probe_kmer <= 100"
  
  sorts:
    is_ascending:
      - "probe_kmer"
      - "probe_selfmatch"
    is_descending:
      - "probe_tm"
      
  remove_overlap:
    location_interval: 25
    
  equal_space:
    num_probes: 500
```

### Running the Example

```bash
# Complete workflow
uprobe run -p dna_protocol.yaml -g genomes.yaml -o dna_results/ --raw
```

### Expected Output

The results directory will contain the filtered DNA probes, evenly spaced across the target locus, with repetitive regions removed.

Example output structure:
```text
target,target_region,dna_probe,probe_gc,probe_tm,probe_kmer
TargetLocus1,ATGCGTACG...,CGTACGAT...,0.50,65.2,1
TargetLocus1,CGATCGATA...,TATCGATC...,0.48,64.7,2
TargetLocus1,GCTAGCTAG...,CTAGCTAC...,0.52,66.1,1
```