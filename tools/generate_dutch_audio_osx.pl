use strict;
use warnings;

my @words = qw(aap bal cel dop een fik gat haas ik jas kop los mama noot op papa quad rood sok tas uur vos was xenos yak zak);

my @args;

for my $word (@words) {

	my $letter = uc(substr( $word, 0, 1 ));
	my $text = "de $letter van $word";
	my $filename = $text;
	$filename =~ s/ /_/g;
	my $filename_converted = $filename;
	$filename .= ".aiff";
	$filename_converted .= ".wav";
	
	print "Creating $text\n";
	# Xander is the Dutch voice, r50 means speak at 50 wmp
	@args = ("say", "-o", $filename, "--voice=Xander", "-r", "50", "\"$text\"");
	system( @args ) == 0 or die "system @args failed: $?";

	# ffmpeg to convert verbose=0, show stats, overwrite output files without prompt
	@args = ("ffmpeg", "-v", "0", "-stats", "-y", "-i", $filename, $filename_converted);
	system( @args ) == 0 or die "system @args failed: $?";

	unlink( $filename );	
}

my @wavs = glob "*.wav";
@args = ("cp", @wavs, "../modules/lezen/audio/");
system( @args ) == 0 or die "system @args failed: $?: $!";

# print something to copypaste into JS
for my $word (@words) {

	my $letter = uc(substr( $word, 0, 1 ));
	my $file = "de_${letter}_van_${word}.wav";
	print "\"$letter\": \"$file\",\n";
}
