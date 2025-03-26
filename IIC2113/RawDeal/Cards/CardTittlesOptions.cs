namespace RawDeal.Cards;

public class CardTittleOptions
{
    private const string Chop = "Chop";
    private const string Punch = "Punch";
    private const string HeadButt = "Head Butt";
    private const string RoundhousePunch = "Roundhouse Punch";
    private const string Haymaker = "Haymaker";
    private const string BackBodyDrop = "Back Body Drop";
    private const string BigBoot = "Big Boot";
    private const string ShoulderBlock = "Shoulder Block";
    private const string Kick = "Kick";
    private const string CrossBodyBlock = "Cross Body Block";
    private const string Ensugiri = "Ensugiri";
    private const string RunningElbowSmash = "Running Elbow Smash";
    private const string DropKick = "Drop Kick";
    private const string DiscusPunch = "Discus Punch";
    private const string Superkick = "Superkick";
    private const string SpinningHeelKick = "Spinning Heel Kick";
    private const string Spear = "Spear";
    private const string Clothesline = "Clothesline";
    private const string ChairShot = "Chair Shot";
    private const string Hurricanrana = "Hurricanrana";
    private const string ArmBarTakedown = "Arm Bar Takedown";
    private const string HipToss = "Hip Toss";
    private const string ArmDrag = "Arm Drag";
    private const string RussianLegSweep = "Russian Leg Sweep";
    private const string SnapMare = "Snap Mare";
    private const string GutBuster = "Gut Buster";
    private const string BodySlam = "Body Slam";
    private const string BackBreaker = "Back Breaker";
    private const string DoubleLegTakedown = "Double Leg Takedown";
    private const string FiremansCarry = "Fireman's Carry";
    private const string HeadlockTakedown = "Headlock Takedown";
    private const string BellyToBellySuplex = "Belly to Belly Suplex";       
    private const string AtomicFacebuster = "Atomic Facebuster";
    private const string AtomicDrop = "Atomic Drop";
    private const string InverseAtomicDrop = "Inverse Atomic Drop";
    private const string VerticalSuplex = "Vertical Suplex";
    private const string BellyToBackSuplex = "Belly to Back Suplex";
    private const string PumpHandleSlam = "Pump Handle Slam";
    private const string ReverseDdt = "Reverse DDT";
    private const string SamoanDrop = "Samoan Drop";
    private const string SitOutPowerbomb = "Sit Out Powerbomb";
    private const string Bulldog = "Bulldog";
    private const string FishermansSuplex = "Fisherman's Suplex";
    private const string Ddt = "DDT";
    private const string PowerSlam = "Power Slam";
    private const string Powerbomb = "Powerbomb";
    private const string PressSlam = "Press Slam";
    private const string CollarElbowLockup = "Collar & Elbow Lockup";        
    private const string WristLock = "Wrist Lock";
    private const string ArmBar = "Arm Bar";
    private const string ChinLock = "Chin Lock";
    private const string BearHug = "Bear Hug";
    private const string FullNelson = "Full Nelson";
    private const string ChokeHold = "Choke Hold";
    private const string StepOverToeHold = "Step Over Toe Hold";
    private const string AnkleLock = "Ankle Lock";
    private const string StandingSideHeadlock = "Standing Side Headlock";    
    private const string CobraClutch = "Cobra Clutch";
    private const string BowArrow = "Bow & Arrow";
    private const string ChickenWing = "Chicken Wing";
    private const string Sleeper = "Sleeper";
    private const string CamelClutch = "Camel Clutch";
    private const string BostonCrab = "Boston Crab";
    private const string GuillotineStretch = "Guillotine Stretch";
    private const string AbdominalStretch = "Abdominal Stretch";
    private const string TortureRack = "Torture Rack";
    private const string FigureFourLegLock = "Figure Four Leg Lock";
    private const string StepAside = "Step Aside";
    private const string EscapeMove = "Escape Move";
    private const string BreakTheHold = "Break the Hold";
    private const string RollingTakedown = "Rolling Takedown";
    private const string KneeToTheGut = "Knee to the Gut";
    private const string ElbowToTheFace = "Elbow to the Face";
    private const string CleanBreak = "Clean Break";
    private const string ManagerInterferes = "Manager Interferes";
    private const string Disqualification = "Disqualification!";
    private const string NoChanceInHell = "No Chance in Hell";
    private const string Hmmm = "Hmmm";
    private const string DontThinkTooHard = "Don't Think Too Hard";
    private const string WhaddyaGot = "Whaddya Got?";
    private const string NotYet = "Not Yet";
    private const string JockeyingForPosition = "Jockeying for Position";    
    private const string IrishWhip = "Irish Whip";
    private const string FlashInThePan = "Flash in the Pan";
    private const string ViewOfVillainy = "View of Villainy";
    private const string ShakeItOff = "Shake It Off";
    private const string OfferHandshake = "Offer Handshake";
    private const string RollOutOfTheRing = "Roll Out of the Ring";
    private const string DistractTheRef = "Distract the Ref";
    private const string Recovery = "Recovery";
    private const string SpitAtOpponent = "Spit At Opponent";
    private const string GetCrowdSupport = "Get Crowd Support";
    private const string Comeback = "Comeback!";
    private const string EgoBoost = "Ego Boost";
    private const string DeludingYourself = "Deluding Yourself";
    private const string Stagger = "Stagger";
    private const string Diversion = "Diversion";
    private const string MarkingOut = "Marking Out";
    private const string PuppiesPuppies = "Puppies! Puppies!";
    private const string ShaneOmac = "Shane O'Mac";
    private const string MaintainHold = "Maintain Hold";
    private const string PatGerry = "Pat & Gerry";
    private const string AustinElbowSmash = "Austin Elbow Smash";
    private const string LouTheszPress = "Lou Thesz Press";
    private const string DoubleDigits = "Double Digits";
    private const string StoneColdStunner = "Stone Cold Stunner";
    private const string OpenUpACanOfWhoopa = "Open Up a Can of Whoop-A%$";  
    private const string UndertakersChokeslam = "Undertaker's Chokeslam";    
    private const string UndertakersFlyingClothesline = "Undertaker's Flying Clothesline";
    private const string UndertakerSitsUp = "Undertaker Sits Up!";
    private const string UndertakersTombstonePiledriver = "Undertaker's Tombstone Piledriver";
    private const string PowerOfDarkness = "Power of Darkness";
    private const string HaveANiceDay = "Have a Nice Day!";
    private const string DoubleArmDdt = "Double Arm DDT";
    private const string TreeOfWoe = "Tree of Woe";
    private const string MandibleClaw = "Mandible Claw";
    private const string MrSocko = "Mr. Socko";
    private const string LeapingKneeToTheFace = "Leaping Knee to the Face";  
    private const string Facebuster = "Facebuster";
    private const string IAmTheGame = "I Am the Game";
    private const string Pedigree = "Pedigree";
    private const string ChynaInterferes = "Chyna Interferes";
    private const string SmackdownHotel = "Smackdown Hotel";
    private const string TakeThatMoveShineItUpRealNice = "Take That Move, Shine It Up Real Nice, Turn That Sumb*tch Sideways, and Stick It Straight Up Your Roody Poo Candy A%$!";
    private const string RockBottom = "Rock Bottom";
    private const string ThePeoplesEyebrow = "The People's Eyebrow";
    private const string ThePeoplesElbow = "The People's Elbow";
    private const string KanesChokeslam = "Kane's Chokeslam";
    private const string KanesFlyingClothesline = "Kane's Flying Clothesline";
    private const string KanesReturn = "Kane's Return!";
    private const string KanesTombstonePiledriver = "Kane's Tombstone Piledriver";
    private const string HellfireBrimstone = "Hellfire & Brimstone";
    private const string Lionsault = "Lionsault";
    private const string Yj = "Y2J";
    private const string DontYouNeverEver = "Don't You Never... EVER!";      
    private const string WallsOfJericho = "Walls of Jericho";
    private const string AyatollahOfRockNRolla = "Ayatollah of Rock 'n' Roll-a";

    public CardTittle GetCardTypeFromString(string cardTittleString)
    {
        CardTittle cardTittle;
        if (cardTittleString == Chop)
            return CardTittle.Chop;
        if (cardTittleString == Punch)
            return CardTittle.Punch;
        if (cardTittleString == HeadButt)
            return CardTittle.HeadButt;
        if (cardTittleString == RoundhousePunch)
            return CardTittle.RoundhousePunch;
        if (cardTittleString == Haymaker)
            return CardTittle.Haymaker;
        if (cardTittleString == BackBodyDrop)
            return CardTittle.BackBodyDrop;
        if (cardTittleString == BigBoot)
            return CardTittle.BigBoot;
        if (cardTittleString == ShoulderBlock)
            return CardTittle.ShoulderBlock;
        if (cardTittleString == Kick)
            return CardTittle.Kick;
        if (cardTittleString == CrossBodyBlock)
            return CardTittle.CrossBodyBlock;
        if (cardTittleString == Ensugiri)
            return CardTittle.Ensugiri;
        if (cardTittleString == RunningElbowSmash)
            return CardTittle.RunningElbowSmash;
        if (cardTittleString == DropKick)
            return CardTittle.DropKick;
        if (cardTittleString == DiscusPunch)
            return CardTittle.DiscusPunch;
        if (cardTittleString == Superkick)
            return CardTittle.Superkick;
        if (cardTittleString == SpinningHeelKick)
            return CardTittle.SpinningHeelKick;
        if (cardTittleString == Spear)
            return CardTittle.Spear;
        if (cardTittleString == Clothesline)
            return CardTittle.Clothesline;
        if (cardTittleString == ChairShot)
            return CardTittle.ChairShot;
        if (cardTittleString == Hurricanrana)
            return CardTittle.Hurricanrana;
        if (cardTittleString == ArmBarTakedown)
            return CardTittle.ArmBarTakedown;
        if (cardTittleString == HipToss)
            return CardTittle.HipToss;
        if (cardTittleString == ArmDrag)
            return CardTittle.ArmDrag;
        if (cardTittleString == RussianLegSweep)
            return CardTittle.RussianLegSweep;
        if (cardTittleString == SnapMare)
            return CardTittle.SnapMare;
        if (cardTittleString == GutBuster)
            return CardTittle.GutBuster;
        if (cardTittleString == BodySlam)
            return CardTittle.BodySlam;
        if (cardTittleString == BackBreaker)
            return CardTittle.BackBreaker;
        if (cardTittleString == DoubleLegTakedown)
            return CardTittle.DoubleLegTakedown;
        if (cardTittleString == FiremansCarry)
            return CardTittle.FiremansCarry;
        if (cardTittleString == HeadlockTakedown)
            return CardTittle.HeadlockTakedown;
        if (cardTittleString == BellyToBellySuplex)
            return CardTittle.BellyToBellySuplex;
        if (cardTittleString == AtomicFacebuster)
            return CardTittle.AtomicFacebuster;
        if (cardTittleString == AtomicDrop)
            return CardTittle.AtomicDrop;
        if (cardTittleString == InverseAtomicDrop)
            return CardTittle.InverseAtomicDrop;
        if (cardTittleString == VerticalSuplex)
            return CardTittle.VerticalSuplex;
        if (cardTittleString == BellyToBackSuplex)
            return CardTittle.BellyToBackSuplex;
        if (cardTittleString == PumpHandleSlam)
            return CardTittle.PumpHandleSlam;
        if (cardTittleString == ReverseDdt)
            return CardTittle.ReverseDdt;
        if (cardTittleString == SamoanDrop)
            return CardTittle.SamoanDrop;
        if (cardTittleString == SitOutPowerbomb)
            return CardTittle.SitOutPowerbomb;
        if (cardTittleString == Bulldog)
            return CardTittle.Bulldog;
        if (cardTittleString == FishermansSuplex)
            return CardTittle.FishermansSuplex;
        if (cardTittleString == Ddt)
            return CardTittle.Ddt;
        if (cardTittleString == PowerSlam)
            return CardTittle.PowerSlam;
        if (cardTittleString == Powerbomb)
            return CardTittle.Powerbomb;
        if (cardTittleString == PressSlam)
            return CardTittle.PressSlam;
        if (cardTittleString == CollarElbowLockup)
            return CardTittle.CollarElbowLockup;
        if (cardTittleString == WristLock)
            return CardTittle.WristLock;
        if (cardTittleString == ArmBar)
            return CardTittle.ArmBar;
        if (cardTittleString == ChinLock)
            return CardTittle.ChinLock;
        if (cardTittleString == BearHug)
            return CardTittle.BearHug;
        if (cardTittleString == FullNelson)
            return CardTittle.FullNelson;
        if (cardTittleString == ChokeHold)
            return CardTittle.ChokeHold;
        if (cardTittleString == StepOverToeHold)
            return CardTittle.StepOverToeHold;
        if (cardTittleString == AnkleLock)
            return CardTittle.AnkleLock;
        if (cardTittleString == StandingSideHeadlock)
            return CardTittle.StandingSideHeadlock;
        if (cardTittleString == CobraClutch)
            return CardTittle.CobraClutch;
        if (cardTittleString == BowArrow)
            return CardTittle.BowArrow;
        if (cardTittleString == ChickenWing)
            return CardTittle.ChickenWing;
        if (cardTittleString == Sleeper)
            return CardTittle.Sleeper;
        if (cardTittleString == CamelClutch)
            return CardTittle.CamelClutch;
        if (cardTittleString == BostonCrab)
            return CardTittle.BostonCrab;
        if (cardTittleString == GuillotineStretch)
            return CardTittle.GuillotineStretch;
        if (cardTittleString == AbdominalStretch)
            return CardTittle.AbdominalStretch;
        if (cardTittleString == TortureRack)
            return CardTittle.TortureRack;
        if (cardTittleString == FigureFourLegLock)
            return CardTittle.FigureFourLegLock;
        if (cardTittleString == StepAside)
            return CardTittle.StepAside;
        if (cardTittleString == EscapeMove)
            return CardTittle.EscapeMove;
        if (cardTittleString == BreakTheHold)
            return CardTittle.BreakTheHold;
        if (cardTittleString == RollingTakedown)
            return CardTittle.RollingTakedown;
        if (cardTittleString == KneeToTheGut)
            return CardTittle.KneeToTheGut;
        if (cardTittleString == ElbowToTheFace)
            return CardTittle.ElbowToTheFace;
        if (cardTittleString == CleanBreak)
            return CardTittle.CleanBreak;
        if (cardTittleString == ManagerInterferes)
            return CardTittle.ManagerInterferes;
        if (cardTittleString == Disqualification)
            return CardTittle.Disqualification;
        if (cardTittleString == NoChanceInHell)
            return CardTittle.NoChanceInHell;
        if (cardTittleString == Hmmm)
            return CardTittle.Hmmm;
        if (cardTittleString == DontThinkTooHard)
            return CardTittle.DontThinkTooHard;
        if (cardTittleString == WhaddyaGot)
            return CardTittle.WhaddyaGot;
        if (cardTittleString == NotYet)
            return CardTittle.NotYet;
        if (cardTittleString == JockeyingForPosition)
            return CardTittle.JockeyingForPosition;
        if (cardTittleString == IrishWhip)
            return CardTittle.IrishWhip;
        if (cardTittleString == FlashInThePan)
            return CardTittle.FlashInThePan;
        if (cardTittleString == ViewOfVillainy)
            return CardTittle.ViewOfVillainy;
        if (cardTittleString == ShakeItOff)
            return CardTittle.ShakeItOff;
        if (cardTittleString == OfferHandshake)
            return CardTittle.OfferHandshake;
        if (cardTittleString == RollOutOfTheRing)
            return CardTittle.RollOutOfTheRing;
        if (cardTittleString == DistractTheRef)
            return CardTittle.DistractTheRef;
        if (cardTittleString == Recovery)
            return CardTittle.Recovery;
        if (cardTittleString == SpitAtOpponent)
            return CardTittle.SpitAtOpponent;
        if (cardTittleString == GetCrowdSupport)
            return CardTittle.GetCrowdSupport;
        if (cardTittleString == Comeback)
            return CardTittle.Comeback;
        if (cardTittleString == EgoBoost)
            return CardTittle.EgoBoost;
        if (cardTittleString == DeludingYourself)
            return CardTittle.DeludingYourself;
        if (cardTittleString == Stagger)
            return CardTittle.Stagger;
        if (cardTittleString == Diversion)
            return CardTittle.Diversion;
        if (cardTittleString == MarkingOut)
            return CardTittle.MarkingOut;
        if (cardTittleString == PuppiesPuppies)
            return CardTittle.PuppiesPuppies;
        if (cardTittleString == ShaneOmac)
            return CardTittle.ShaneOmac;
        if (cardTittleString == MaintainHold)
            return CardTittle.MaintainHold;
        if (cardTittleString == PatGerry)
            return CardTittle.PatGerry;
        if (cardTittleString == AustinElbowSmash)
            return CardTittle.AustinElbowSmash;
        if (cardTittleString == LouTheszPress)
            return CardTittle.LouTheszPress;
        if (cardTittleString == DoubleDigits)
            return CardTittle.DoubleDigits;
        if (cardTittleString == StoneColdStunner)
            return CardTittle.StoneColdStunner;
        if (cardTittleString == OpenUpACanOfWhoopa)
            return CardTittle.OpenUpACanOfWhoopa;
        if (cardTittleString == UndertakersChokeslam)
            return CardTittle.UndertakersChokeslam;
        if (cardTittleString == UndertakersFlyingClothesline)
            return CardTittle.UndertakersFlyingClothesline;
        if (cardTittleString == UndertakerSitsUp)
            return CardTittle.UndertakerSitsUp;
        if (cardTittleString == UndertakersTombstonePiledriver)
            return CardTittle.UndertakersTombstonePiledriver;
        if (cardTittleString == PowerOfDarkness)
            return CardTittle.PowerOfDarkness;
        if (cardTittleString == HaveANiceDay)
            return CardTittle.HaveANiceDay;
        if (cardTittleString == DoubleArmDdt)
            return CardTittle.DoubleArmDdt;
        if (cardTittleString == TreeOfWoe)
            return CardTittle.TreeOfWoe;
        if (cardTittleString == MandibleClaw)
            return CardTittle.MandibleClaw;
        if (cardTittleString == MrSocko)
            return CardTittle.MrSocko;
        if (cardTittleString == LeapingKneeToTheFace)
            return CardTittle.LeapingKneeToTheFace;
        if (cardTittleString == Facebuster)
            return CardTittle.Facebuster;
        if (cardTittleString == IAmTheGame)
            return CardTittle.IAmTheGame;
        if (cardTittleString == Pedigree)
            return CardTittle.Pedigree;
        if (cardTittleString == ChynaInterferes)
            return CardTittle.ChynaInterferes;
        if (cardTittleString == SmackdownHotel)
            return CardTittle.SmackdownHotel;
        if (cardTittleString == TakeThatMoveShineItUpRealNice)
            return CardTittle.TakeThatMoveShineItUpRealNice;
        if (cardTittleString == RockBottom)
            return CardTittle.RockBottom;
        if (cardTittleString == ThePeoplesEyebrow)
            return CardTittle.ThePeoplesEyebrow;
        if (cardTittleString == ThePeoplesElbow)
            return CardTittle.ThePeoplesElbow;
        if (cardTittleString == KanesChokeslam)
            return CardTittle.KanesChokeslam;
        if (cardTittleString == KanesFlyingClothesline)
            return CardTittle.KanesFlyingClothesline;
        if (cardTittleString == KanesReturn)
            return CardTittle.KanesReturn;
        if (cardTittleString == KanesTombstonePiledriver)
            return CardTittle.KanesTombstonePiledriver;
        if (cardTittleString == HellfireBrimstone)
            return CardTittle.HellfireBrimstone;
        if (cardTittleString == Lionsault)
            return CardTittle.Lionsault;
        if (cardTittleString == Yj)
            return CardTittle.Yj;
        if (cardTittleString == DontYouNeverEver)
            return CardTittle.DontYouNeverEver;
        if (cardTittleString == WallsOfJericho)
            return CardTittle.WallsOfJericho;
        if (cardTittleString == AyatollahOfRockNRolla)
            return CardTittle.AyatollahOfRockNRolla;
        throw new ArgumentException("La carta que se agrego no existe.");
    }

    public string ObtainCardTittleString(CardTittle cardTittle)
    {
        if (cardTittle == CardTittle.Chop)
            return Chop;
        if (cardTittle == CardTittle.Punch)
            return Punch;
        if (cardTittle == CardTittle.HeadButt)
            return HeadButt;
        if (cardTittle == CardTittle.RoundhousePunch)
            return RoundhousePunch;
        if (cardTittle == CardTittle.Haymaker)
            return Haymaker;
        if (cardTittle == CardTittle.BackBodyDrop)
            return BackBodyDrop;
        if (cardTittle == CardTittle.BigBoot)
            return BigBoot;
        if (cardTittle == CardTittle.ShoulderBlock)
            return ShoulderBlock;
        if (cardTittle == CardTittle.Kick)
            return Kick;
        if (cardTittle == CardTittle.CrossBodyBlock)
            return CrossBodyBlock;
        if (cardTittle == CardTittle.Ensugiri)
            return Ensugiri;
        if (cardTittle == CardTittle.RunningElbowSmash)
            return RunningElbowSmash;
        if (cardTittle == CardTittle.DropKick)
            return DropKick;
        if (cardTittle == CardTittle.DiscusPunch)
            return DiscusPunch;
        if (cardTittle == CardTittle.Superkick)
            return Superkick;
        if (cardTittle == CardTittle.SpinningHeelKick)
            return SpinningHeelKick;
        if (cardTittle == CardTittle.Spear)
            return Spear;
        if (cardTittle == CardTittle.Clothesline)
            return Clothesline;
        if (cardTittle == CardTittle.ChairShot)
            return ChairShot;
        if (cardTittle == CardTittle.Hurricanrana)
            return Hurricanrana;
        if (cardTittle == CardTittle.ArmBarTakedown)
            return ArmBarTakedown;
        if (cardTittle == CardTittle.HipToss)
            return HipToss;
        if (cardTittle == CardTittle.ArmDrag)
            return ArmDrag;
        if (cardTittle == CardTittle.RussianLegSweep)
            return RussianLegSweep;
        if (cardTittle == CardTittle.SnapMare)
            return SnapMare;
        if (cardTittle == CardTittle.GutBuster)
            return GutBuster;
        if (cardTittle == CardTittle.BodySlam)
            return BodySlam;
        if (cardTittle == CardTittle.BackBreaker)
            return BackBreaker;
        if (cardTittle == CardTittle.DoubleLegTakedown)
            return DoubleLegTakedown;
        if (cardTittle == CardTittle.FiremansCarry)
            return FiremansCarry;
        if (cardTittle == CardTittle.HeadlockTakedown)
            return HeadlockTakedown;
        if (cardTittle == CardTittle.BellyToBellySuplex)
            return BellyToBellySuplex;
        if (cardTittle == CardTittle.AtomicFacebuster)
            return AtomicFacebuster;
        if (cardTittle == CardTittle.AtomicDrop)
            return AtomicDrop;
        if (cardTittle == CardTittle.InverseAtomicDrop)
            return InverseAtomicDrop;
        if (cardTittle == CardTittle.VerticalSuplex)
            return VerticalSuplex;
        if (cardTittle == CardTittle.BellyToBackSuplex)
            return BellyToBackSuplex;
        if (cardTittle == CardTittle.PumpHandleSlam)
            return PumpHandleSlam;
        if (cardTittle == CardTittle.ReverseDdt)
            return ReverseDdt;
        if (cardTittle == CardTittle.SamoanDrop)
            return SamoanDrop;
        if (cardTittle == CardTittle.SitOutPowerbomb)
            return SitOutPowerbomb;
        if (cardTittle == CardTittle.Bulldog)
            return Bulldog;
        if (cardTittle == CardTittle.FishermansSuplex)
            return FishermansSuplex;
        if (cardTittle == CardTittle.Ddt)
            return Ddt;
        if (cardTittle == CardTittle.PowerSlam)
            return PowerSlam;
        if (cardTittle == CardTittle.Powerbomb)
            return Powerbomb;
        if (cardTittle == CardTittle.PressSlam)
            return PressSlam;
        if (cardTittle == CardTittle.CollarElbowLockup)
            return CollarElbowLockup;
        if (cardTittle == CardTittle.WristLock)
            return WristLock;
        if (cardTittle == CardTittle.ArmBar)
            return ArmBar;
        if (cardTittle == CardTittle.ChinLock)
            return ChinLock;
        if (cardTittle == CardTittle.BearHug)
            return BearHug;
        if (cardTittle == CardTittle.FullNelson)
            return FullNelson;
        if (cardTittle == CardTittle.ChokeHold)
            return ChokeHold;
        if (cardTittle == CardTittle.StepOverToeHold)
            return StepOverToeHold;
        if (cardTittle == CardTittle.AnkleLock)
            return AnkleLock;
        if (cardTittle == CardTittle.StandingSideHeadlock)
            return StandingSideHeadlock;
        if (cardTittle == CardTittle.CobraClutch)
            return CobraClutch;
        if (cardTittle == CardTittle.BowArrow)
            return BowArrow;
        if (cardTittle == CardTittle.ChickenWing)
            return ChickenWing;
        if (cardTittle == CardTittle.Sleeper)
            return Sleeper;
        if (cardTittle == CardTittle.CamelClutch)
            return CamelClutch;
        if (cardTittle == CardTittle.BostonCrab)
            return BostonCrab;
        if (cardTittle == CardTittle.GuillotineStretch)
            return GuillotineStretch;
        if (cardTittle == CardTittle.AbdominalStretch)
            return AbdominalStretch;
        if (cardTittle == CardTittle.TortureRack)
            return TortureRack;
        if (cardTittle == CardTittle.FigureFourLegLock)
            return FigureFourLegLock;
        if (cardTittle == CardTittle.StepAside)
            return StepAside;
        if (cardTittle == CardTittle.EscapeMove)
            return EscapeMove;
        if (cardTittle == CardTittle.BreakTheHold)
            return BreakTheHold;
        if (cardTittle == CardTittle.RollingTakedown)
            return RollingTakedown;
        if (cardTittle == CardTittle.KneeToTheGut)
            return KneeToTheGut;
        if (cardTittle == CardTittle.ElbowToTheFace)
            return ElbowToTheFace;
        if (cardTittle == CardTittle.CleanBreak)
            return CleanBreak;
        if (cardTittle == CardTittle.ManagerInterferes)
            return ManagerInterferes;
        if (cardTittle == CardTittle.Disqualification)
            return Disqualification;
        if (cardTittle == CardTittle.NoChanceInHell)
            return NoChanceInHell;
        if (cardTittle == CardTittle.Hmmm)
            return Hmmm;
        if (cardTittle == CardTittle.DontThinkTooHard)
            return DontThinkTooHard;
        if (cardTittle == CardTittle.WhaddyaGot)
            return WhaddyaGot;
        if (cardTittle == CardTittle.NotYet)
            return NotYet;
        if (cardTittle == CardTittle.JockeyingForPosition)
            return JockeyingForPosition;
        if (cardTittle == CardTittle.IrishWhip)
            return IrishWhip;
        if (cardTittle == CardTittle.FlashInThePan)
            return FlashInThePan;
        if (cardTittle == CardTittle.ViewOfVillainy)
            return ViewOfVillainy;
        if (cardTittle == CardTittle.ShakeItOff)
            return ShakeItOff;
        if (cardTittle == CardTittle.OfferHandshake)
            return OfferHandshake;
        if (cardTittle == CardTittle.RollOutOfTheRing)
            return RollOutOfTheRing;
        if (cardTittle == CardTittle.DistractTheRef)
            return DistractTheRef;
        if (cardTittle == CardTittle.Recovery)
            return Recovery;
        if (cardTittle == CardTittle.SpitAtOpponent)
            return SpitAtOpponent;
        if (cardTittle == CardTittle.GetCrowdSupport)
            return GetCrowdSupport;
        if (cardTittle == CardTittle.Comeback)
            return Comeback;
        if (cardTittle == CardTittle.EgoBoost)
            return EgoBoost;
        if (cardTittle == CardTittle.DeludingYourself)
            return DeludingYourself;
        if (cardTittle == CardTittle.Stagger)
            return Stagger;
        if (cardTittle == CardTittle.Diversion)
            return Diversion;
        if (cardTittle == CardTittle.MarkingOut)
            return MarkingOut;
        if (cardTittle == CardTittle.PuppiesPuppies)
            return PuppiesPuppies;
        if (cardTittle == CardTittle.ShaneOmac)
            return ShaneOmac;
        if (cardTittle == CardTittle.MaintainHold)
            return MaintainHold;
        if (cardTittle == CardTittle.PatGerry)
            return PatGerry;
        if (cardTittle == CardTittle.AustinElbowSmash)
            return AustinElbowSmash;
        if (cardTittle == CardTittle.LouTheszPress)
            return LouTheszPress;
        if (cardTittle == CardTittle.DoubleDigits)
            return DoubleDigits;
        if (cardTittle == CardTittle.StoneColdStunner)
            return StoneColdStunner;
        if (cardTittle == CardTittle.OpenUpACanOfWhoopa)
            return OpenUpACanOfWhoopa;
        if (cardTittle == CardTittle.UndertakersChokeslam)
            return UndertakersChokeslam;
        if (cardTittle == CardTittle.UndertakersFlyingClothesline)
            return UndertakersFlyingClothesline;
        if (cardTittle == CardTittle.UndertakerSitsUp)
            return UndertakerSitsUp;
        if (cardTittle == CardTittle.UndertakersTombstonePiledriver)
            return UndertakersTombstonePiledriver;
        if (cardTittle == CardTittle.PowerOfDarkness)
            return PowerOfDarkness;
        if (cardTittle == CardTittle.HaveANiceDay)
            return HaveANiceDay;
        if (cardTittle == CardTittle.DoubleArmDdt)
            return DoubleArmDdt;
        if (cardTittle == CardTittle.TreeOfWoe)
            return TreeOfWoe;
        if (cardTittle == CardTittle.MandibleClaw)
            return MandibleClaw;
        if (cardTittle == CardTittle.MrSocko)
            return MrSocko;
        if (cardTittle == CardTittle.LeapingKneeToTheFace)
            return LeapingKneeToTheFace;
        if (cardTittle == CardTittle.Facebuster)
            return Facebuster;
        if (cardTittle == CardTittle.IAmTheGame)
            return IAmTheGame;
        if (cardTittle == CardTittle.Pedigree)
            return Pedigree;
        if (cardTittle == CardTittle.ChynaInterferes)
            return ChynaInterferes;
        if (cardTittle == CardTittle.SmackdownHotel)
            return SmackdownHotel;
        if (cardTittle == CardTittle.TakeThatMoveShineItUpRealNice)
            return TakeThatMoveShineItUpRealNice;
        if (cardTittle == CardTittle.RockBottom)
            return RockBottom;
        if (cardTittle == CardTittle.ThePeoplesEyebrow)
            return ThePeoplesEyebrow;
        if (cardTittle == CardTittle.ThePeoplesElbow)
            return ThePeoplesElbow;
        if (cardTittle == CardTittle.KanesChokeslam)
            return KanesChokeslam;
        if (cardTittle == CardTittle.KanesFlyingClothesline)
            return KanesFlyingClothesline;
        if (cardTittle == CardTittle.KanesReturn)
            return KanesReturn;
        if (cardTittle == CardTittle.KanesTombstonePiledriver)
            return KanesTombstonePiledriver;
        if (cardTittle == CardTittle.HellfireBrimstone)
            return HellfireBrimstone;
        if (cardTittle == CardTittle.Lionsault)
            return Lionsault;
        if (cardTittle == CardTittle.Yj)
            return Yj;
        if (cardTittle == CardTittle.DontYouNeverEver)
            return DontYouNeverEver;
        if (cardTittle == CardTittle.WallsOfJericho)
            return WallsOfJericho;
        if (cardTittle == CardTittle.AyatollahOfRockNRolla)
            return AyatollahOfRockNRolla;
        throw new ArgumentException("La carta que se solicito no existe.");
    }
}