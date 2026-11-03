import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, router } from "expo-router";
import { useMemo, useState } from "react";
import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "@/components/AppButton";
import AppCard from "@/components/AppCard";
import AppInput from "@/components/AppInput";
import { AvatarStack, EmptyState, SectionTitle, TripHeader, TripSectionTabs } from "@/components/TripUI";
import { useTrips } from "@/contexts/TripContext";
import type { Trip, TripSection } from "@/types/trips";
import { theme } from "@/constants/theme";

const formatMoney = (amount: number, currency: string) => `${currency === "EUR" ? "€" : "$"}${amount.toLocaleString("en-US")}`;

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trips, toggleTask, addExpense, addMessage, addTask, addActivity } = useTrips();
  const trip = trips.find((item) => item.id === id);
  const [section, setSection] = useState<TripSection>("Overview");
  const [expenseForm, setExpenseForm] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [taskForm, setTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [message, setMessage] = useState("");
  const [activityForm, setActivityForm] = useState(false);
  const [activityTitle, setActivityTitle] = useState("");
  const [activityLocation, setActivityLocation] = useState("");

  const title = useMemo(() => {
    if (!trip) return "Trip";
    const names: Record<TripSection, string> = { Overview: trip.name, Itinerary: "The plan", Budget: "Every expense, shared", Chat: "The crew", Tasks: "A little teamwork" };
    return names[section];
  }, [section, trip]);

  if (!trip) return <SafeAreaView style={styles.safe}><View style={styles.missing}><Text style={styles.heading}>We can’t find that trip.</Text><AppButton title="Back to trips" onPress={() => router.replace("/(tabs)/trips")} /></View></SafeAreaView>;

  const spent = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = Math.max(0, trip.budget - spent);
  const completed = trip.tasks.filter((task) => task.done).length;
  const firstActivity = trip.itinerary[0];

  const submitExpense = () => {
    const amount = Number(expenseAmount.replace(/[^0-9.]/g, ""));
    if (!expenseTitle.trim() || !amount) return;
    addExpense(trip.id, { title: expenseTitle.trim(), detail: "You paid · split equally", amount, paidBy: "You", icon: "cart-outline" });
    setExpenseTitle(""); setExpenseAmount(""); setExpenseForm(false);
  };
  const submitTask = () => {
    if (!taskTitle.trim()) return;
    addTask(trip.id, taskTitle.trim()); setTaskTitle(""); setTaskForm(false);
  };
  const submitMessage = () => {
    if (!message.trim()) return;
    addMessage(trip.id, message.trim()); setMessage("");
  };
  const submitActivity = () => {
    if (!activityTitle.trim()) return;
    addActivity(trip.id, activityTitle.trim(), activityLocation.trim() || trip.destination);
    setActivityTitle(""); setActivityLocation(""); setActivityForm(false);
  };

  return <SafeAreaView style={styles.safe} edges={["top"]}>
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TripHeader title={title} subtitle={`${trip.name} · ${trip.days} days · ${trip.destination}`} />
        <TripSectionTabs active={section} onChange={setSection} />
        {section === "Overview" && <Overview trip={trip} spent={spent} firstActivity={firstActivity} onSection={setSection} />}
        {section === "Itinerary" && <Itinerary trip={trip} activityForm={activityForm} setActivityForm={setActivityForm} activityTitle={activityTitle} setActivityTitle={setActivityTitle} activityLocation={activityLocation} setActivityLocation={setActivityLocation} submitActivity={submitActivity} />}
        {section === "Budget" && <Budget trip={trip} spent={spent} remaining={remaining} expenseForm={expenseForm} setExpenseForm={setExpenseForm} expenseTitle={expenseTitle} setExpenseTitle={setExpenseTitle} expenseAmount={expenseAmount} setExpenseAmount={setExpenseAmount} submitExpense={submitExpense} />}
        {section === "Chat" && <Chat trip={trip} message={message} setMessage={setMessage} submitMessage={submitMessage} />}
        {section === "Tasks" && <Tasks trip={trip} completed={completed} taskForm={taskForm} setTaskForm={setTaskForm} taskTitle={taskTitle} setTaskTitle={setTaskTitle} submitTask={submitTask} toggleTask={(taskId) => toggleTask(trip.id, taskId)} />}
      </ScrollView>
      <View style={styles.tabSpacer} />
    </View>
  </SafeAreaView>;
}

function Overview({ trip, spent, firstActivity, onSection }: { trip: Trip; spent: number; firstActivity?: Trip["itinerary"][number]; onSection: (section: TripSection) => void }) {
  return <View>
    <View style={styles.hero}><Image source={trip.image} contentFit="cover" style={StyleSheet.absoluteFill} transition={180} /><View style={styles.heroShade} /><View style={styles.heroText}><Text style={styles.heroEyebrow}>{trip.days} DAYS UNTIL WE GO</Text><Text style={styles.heroTitle}>Five days. Our kind of city.</Text></View></View>
    <View style={styles.membersLine}><AvatarStack members={trip.members} /><Text style={styles.memberNames}>Your travel crew{"\n"}{trip.members.map((person) => person.name.split(" ")[0]).join(", ")}</Text><Ionicons name="people-outline" size={18} color={theme.colors.primary} /></View>
    <View style={styles.statRow}><AppCard variant="default" padding={14} style={styles.statCard}><Text style={styles.statLabel}>GROUP SPENDING</Text><Text style={styles.statValue}>{formatMoney(spent, trip.currency)}</Text><Text style={styles.statNote}>of {formatMoney(trip.budget, trip.currency)} budget</Text></AppCard><AppCard variant="default" padding={14} style={styles.statCard}><Text style={styles.statLabel}>PLANNING PROGRESS</Text><Text style={styles.statValue}>{trip.tasks.filter((task) => task.done).length} of {trip.tasks.length}</Text><Text style={styles.statNote}>tasks complete</Text></AppCard></View>
    <SectionTitle title={`First up in ${trip.destination.split(",")[0]}`} action="Itinerary →" onAction={() => onSection("Itinerary")} />
    {firstActivity ? <AppCard padding={14} style={styles.activityCard}><View style={styles.activityDate}><Text style={styles.dateMonth}>JUN</Text><Text style={styles.dateDay}>12</Text></View><View style={styles.activityCopy}><Text style={styles.activityTitle}>{firstActivity.title}</Text><Text style={styles.activityMeta}>{firstActivity.time} · {firstActivity.location}</Text></View><Ionicons name={firstActivity.icon} size={21} color={theme.colors.primary} /></AppCard> : <AppCard padding={0}><EmptyState icon="calendar-outline" title="Your itinerary is ready for ideas" detail="Add a first stop when your group is ready." /></AppCard>}
    <Pressable onPress={() => onSection("Chat")} style={styles.updateRow}><Ionicons name="chatbubble-outline" size={17} color={theme.colors.primary} /><Text style={styles.updateCopy}>{trip.messages.length ? "Your group has shared a few ideas." : "Your group chat is ready."}</Text><Text style={styles.link}>Open chat →</Text></Pressable>
    {trip.expenses[0] && <Pressable onPress={() => onSection("Budget")}><AppCard padding={14} style={styles.recentExpense}><View style={styles.iconBadge}><Ionicons name={trip.expenses[0].icon} size={17} color={theme.colors.primary} /></View><View style={styles.expenseCopy}><Text style={styles.activityTitle}>{trip.expenses[0].title}</Text><Text style={styles.activityMeta}>Latest expense · split equally</Text></View><Text style={styles.amount}>{formatMoney(trip.expenses[0].amount, trip.currency)}</Text></AppCard></Pressable>}
  </View>;
}

function Itinerary({ trip, activityForm, setActivityForm, activityTitle, setActivityTitle, activityLocation, setActivityLocation, submitActivity }: { trip: Trip; activityForm: boolean; setActivityForm: (value: boolean) => void; activityTitle: string; setActivityTitle: (value: string) => void; activityLocation: string; setActivityLocation: (value: string) => void; submitActivity: () => void }) {
  const [day, setDay] = useState(0);
  return <View>
    <View style={styles.dayPicker}>{Array.from({ length: trip.days }, (_, index) => <Pressable key={index} onPress={() => setDay(index)} style={[styles.day, day === index && styles.activeDay]}><Text style={[styles.dayName, day === index && styles.activeDayText]}>{["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"][index % 7]}</Text><Text style={[styles.dayNumber, day === index && styles.activeDayText]}>{12 + index}</Text></Pressable>)}</View>
    <View style={styles.dayHeading}><View><Text style={styles.dayTitle}>{day === 0 ? "Olá, Lisbon" : ["Sunday in Lisbon", "A day in Sintra", "By the water", "One last pastel"][Math.min(day - 1, 3)]}</Text><Text style={styles.activityMeta}>{day === 0 ? "Saturday, June 12 · Arrival day" : `Day ${day + 1} · Make it yours`}</Text></View><View style={styles.weather}><Ionicons name="sunny-outline" size={13} color={theme.colors.warning} /><Text style={styles.weatherText}>24°</Text></View></View>
    {trip.itinerary.length ? trip.itinerary.map((item) => <View key={item.id} style={styles.timelineItem}><View style={styles.timeCol}><Text style={styles.timeText}>{item.time}</Text><View style={styles.timelineLine} /></View><AppCard padding={13} style={styles.timelineCard}><View style={styles.row}><View style={styles.iconBadge}><Ionicons name={item.icon} size={17} color={theme.colors.primary} /></View><View style={styles.flex}><Text style={styles.activityTitle}>{item.title}</Text><Text style={styles.activityMeta}>{item.location}</Text>{item.note && <Text style={styles.note}>{item.note}</Text>}</View><Ionicons name="ellipsis-horizontal" size={16} color={theme.colors.textMuted} /></View></AppCard></View>) : <AppCard padding={0}><EmptyState icon="map-outline" title="Make room for the good stuff" detail="Add the first stop, reservation, or travel detail for the group." /></AppCard>}
    {activityForm && <AppCard padding={14} style={styles.expenseForm}><AppInput label="What's the plan?" placeholder="A walk through Alfama" value={activityTitle} onChangeText={setActivityTitle} /><AppInput label="Where?" placeholder={trip.destination} value={activityLocation} onChangeText={setActivityLocation} /><AppButton title="Save activity" onPress={submitActivity} /></AppCard>}
    <AppButton title={activityForm ? "Close" : "Add an activity"} variant="secondary" icon={activityForm ? "close" : "add"} onPress={() => setActivityForm(!activityForm)} />
  </View>;
}

function Budget({ trip, spent, remaining, expenseForm, setExpenseForm, expenseTitle, setExpenseTitle, expenseAmount, setExpenseAmount, submitExpense }: { trip: Trip; spent: number; remaining: number; expenseForm: boolean; setExpenseForm: (value: boolean) => void; expenseTitle: string; setExpenseTitle: (value: string) => void; expenseAmount: string; setExpenseAmount: (value: string) => void; submitExpense: () => void }) {
  const categorySpend = (icons: Trip["expenses"][number]["icon"][]) => trip.expenses.filter((expense) => icons.includes(expense.icon)).reduce((sum, expense) => sum + expense.amount, 0);
  const fairShare = trip.members.length ? spent / trip.members.length : 0;
  return <View>
    <View style={styles.budgetHero}><Text style={styles.budgetLabel}>GROUP SPENDING</Text><View style={styles.budgetTop}><View><Text style={styles.budgetValue}>{formatMoney(spent, trip.currency)}</Text><Text style={styles.budgetOf}>of {formatMoney(trip.budget, trip.currency)} budget</Text></View><Text style={styles.remaining}>{formatMoney(remaining, trip.currency)} left</Text></View><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${Math.min(100, trip.budget ? spent / trip.budget * 100 : 0)}%` }]} /></View><View style={styles.budgetBreakdown}><View><Text style={styles.budgetSmall}>Stay</Text><Text style={styles.budgetSmallValue}>{formatMoney(categorySpend(["bed-outline"]), trip.currency)}</Text></View><View><Text style={styles.budgetSmall}>Transport</Text><Text style={styles.budgetSmallValue}>{formatMoney(categorySpend(["airplane-outline", "bus-outline"]), trip.currency)}</Text></View><View><Text style={styles.budgetSmall}>Food</Text><Text style={styles.budgetSmallValue}>{formatMoney(categorySpend(["restaurant-outline"]), trip.currency)}</Text></View></View></View>
    <SectionTitle title="Shared expenses" action={expenseForm ? "Cancel" : "+ Add expense"} onAction={() => setExpenseForm(!expenseForm)} />
    {expenseForm && <AppCard padding={14} style={styles.expenseForm}><AppInput label="What was it for?" placeholder="Dinner reservation" value={expenseTitle} onChangeText={setExpenseTitle} /><AppInput label="Amount" placeholder="0" value={expenseAmount} onChangeText={setExpenseAmount} keyboardType="decimal-pad" /><AppButton title="Save expense" onPress={submitExpense} /></AppCard>}
    <AppCard padding={0} style={styles.listCard}>{trip.expenses.length ? trip.expenses.map((expense, index) => <View key={expense.id} style={[styles.expenseRow, index > 0 && styles.separator]}><View style={styles.iconBadge}><Ionicons name={expense.icon} size={17} color={theme.colors.primary} /></View><View style={styles.expenseCopy}><Text style={styles.activityTitle}>{expense.title}</Text><Text style={styles.activityMeta}>{expense.detail}</Text></View><Text style={styles.amount}>{formatMoney(expense.amount, trip.currency)}</Text></View>) : <EmptyState icon="wallet-outline" title="Shared spending starts here" detail="Add a group expense to keep everyone in the loop." />}</AppCard>
    <View style={styles.splitTitle}><View><Text style={styles.sectionHeading}>Split fairly, travel happily</Text><Text style={styles.activityMeta}>{trip.members.length} people · shared equally</Text></View><Text style={styles.link}>Balances</Text></View>
    <View style={styles.splitGrid}>{trip.members.slice(0, 4).map((member) => { const paid = trip.expenses.filter((expense) => expense.paidBy === (member.role ?? member.name.split(" ")[0])).reduce((sum, expense) => sum + expense.amount, 0); const balance = Math.round(paid - fairShare); return <AppCard key={member.id} padding={10} style={styles.splitCell}><Text style={styles.splitName}>{member.role ?? member.name.split(" ")[0]}</Text><Text style={[styles.splitAmount, { color: balance >= 0 ? theme.colors.success : theme.colors.error }]}>{balance >= 0 ? "+" : "−"}{formatMoney(Math.abs(balance), trip.currency)}</Text></AppCard>; })}</View>
    <Text style={styles.activityMeta}>+ receives back · − owes the group</Text>
  </View>;
}

function Chat({ trip, message, setMessage, submitMessage }: { trip: Trip; message: string; setMessage: (value: string) => void; submitMessage: () => void }) {
  return <View>
    <Text style={styles.chatDate}>TODAY · MAY 31, 2027</Text>
    {trip.messages.length ? trip.messages.map((item) => <View key={item.id} style={[styles.messageRow, item.sender === "You" && styles.ownMessageRow]}>{item.sender !== "You" && <View style={styles.miniAvatar}><Text style={styles.miniInitial}>{item.sender.slice(0, 1)}</Text></View>}<View style={[styles.bubble, item.sender === "You" ? styles.ownBubble : styles.otherBubble]}><Text style={[styles.sender, item.sender === "You" && styles.ownText]}>{item.sender} · {item.time}</Text><Text style={[styles.messageText, item.sender === "You" && styles.ownText]}>{item.message}</Text></View></View>) : <EmptyState icon="chatbubbles-outline" title="The group chat is yours" detail="Share a thought, link, or little trip update." />}
    <View style={styles.composer}><TextInput accessibilityLabel="Message the crew" placeholder="Message the crew…" placeholderTextColor={theme.colors.textMuted} value={message} onChangeText={setMessage} style={styles.messageInput} onSubmitEditing={submitMessage} returnKeyType="send" /><Pressable accessibilityRole="button" accessibilityLabel="Send message" onPress={submitMessage} style={styles.sendButton}><Ionicons name="arrow-up" size={19} color="#FFFFFF" /></Pressable></View>
    <Text style={styles.readReceipt}>✓✓ Everyone is up to date</Text>
  </View>;
}

function Tasks({ trip, completed, taskForm, setTaskForm, taskTitle, setTaskTitle, submitTask, toggleTask }: { trip: Trip; completed: number; taskForm: boolean; setTaskForm: (value: boolean) => void; taskTitle: string; setTaskTitle: (value: string) => void; submitTask: () => void; toggleTask: (taskId: string) => void }) {
  const [filter, setFilter] = useState<"All tasks" | "Assigned to me">("All tasks");
  const tasks = trip.tasks.filter((task) => filter === "All tasks" || task.assignee === "You");
  const progress = trip.tasks.length ? completed / trip.tasks.length * 100 : 0;
  return <View>
    <AppCard variant="soft" padding={15} style={styles.taskSummary}><View style={styles.rowBetween}><Text style={styles.summaryTitle}>{completed === trip.tasks.length && trip.tasks.length ? "All wrapped up." : "We’re getting there."}</Text><Text style={styles.link}>{completed} / {trip.tasks.length} done</Text></View><View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress}%` }]} /></View></AppCard>
    <View style={styles.taskFilters}>{(["All tasks", "Assigned to me"] as const).map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.taskFilter, filter === item && styles.activeTaskFilter]}><Text style={[styles.taskFilterText, filter === item && styles.activeTaskFilterText]}>{item}</Text></Pressable>)}</View>
    {taskForm && <AppCard padding={14} style={styles.expenseForm}><AppInput label="Task for the crew" placeholder="Book a table" value={taskTitle} onChangeText={setTaskTitle} returnKeyType="done" onSubmitEditing={submitTask} /><AppButton title="Add task" onPress={submitTask} /></AppCard>}
    {tasks.length ? tasks.map((task) => <Pressable key={task.id} onPress={() => toggleTask(task.id)} accessibilityRole="checkbox" accessibilityState={{ checked: task.done }} style={styles.taskRow}><View style={[styles.checkbox, task.done && styles.checked]}>{task.done && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}</View><View style={styles.taskCopy}><Text style={[styles.taskTitle, task.done && styles.doneTask]}>{task.title}</Text><Text style={styles.activityMeta}>Due {task.due} · {task.assignee}</Text></View><View style={[styles.taskAvatar, task.done && styles.taskAvatarDone]}><Text style={styles.taskAvatarText}>{task.assignee.slice(0, 1)}</Text></View></Pressable>) : <EmptyState icon="checkbox-outline" title="Nothing on the list yet" detail="Add a small task and make the trip even easier." />}
    <AppButton title={taskForm ? "Close task form" : "Add a task for the crew"} variant="text" icon={taskForm ? "close" : "add"} onPress={() => setTaskForm(!taskForm)} />
  </View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.background }, screen: { flex: 1 }, content: { paddingHorizontal: theme.spacing.lg, paddingTop: 6, paddingBottom: 130 }, tabSpacer: { height: 0 },
  missing: { flex: 1, padding: theme.spacing.lg, justifyContent: "center", gap: 18 }, heading: { fontSize: 22, color: theme.colors.text, fontWeight: "700" },
  hero: { height: 178, borderRadius: theme.radius.xl, overflow: "hidden", justifyContent: "flex-end", backgroundColor: theme.colors.surfaceSecondary }, heroShade: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(15, 28, 48, 0.30)" }, heroText: { padding: theme.spacing.base }, heroEyebrow: { color: "#FFFFFF", fontSize: 9, fontWeight: "700", marginBottom: 4 }, heroTitle: { color: "#FFFFFF", fontSize: 21, fontWeight: "800" },
  membersLine: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: theme.spacing.base, marginBottom: theme.spacing.lg }, memberNames: { flex: 1, color: theme.colors.text, fontWeight: "700", fontSize: 12, lineHeight: 17 }, addPerson: { padding: 8 },
  statRow: { flexDirection: "row", gap: 10, marginBottom: theme.spacing.lg }, statCard: { flex: 1 }, statLabel: { fontSize: 9, color: theme.colors.textSecondary, letterSpacing: 0.3, fontWeight: "700" }, statValue: { marginTop: 8, fontSize: 20, color: theme.colors.text, fontWeight: "800" }, statNote: { marginTop: 2, color: theme.colors.textSecondary, fontSize: 10 },
  activityCard: { flexDirection: "row", alignItems: "center", gap: 12 }, activityDate: { width: 40, alignItems: "center" }, dateMonth: { color: theme.colors.primary, fontWeight: "800", fontSize: 9 }, dateDay: { color: theme.colors.text, fontWeight: "700", fontSize: 19 }, activityCopy: { flex: 1 }, activityTitle: { color: theme.colors.text, fontWeight: "700", fontSize: 13 }, activityMeta: { color: theme.colors.textSecondary, fontSize: 10, marginTop: 4 }, updateRow: { flexDirection: "row", gap: 8, alignItems: "center", marginTop: 16, marginBottom: 12 }, updateCopy: { flex: 1, color: theme.colors.textSecondary, fontSize: 11 }, link: { color: theme.colors.primary, fontWeight: "700", fontSize: 11 }, recentExpense: { flexDirection: "row", alignItems: "center", gap: 10 }, iconBadge: { width: 34, height: 34, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.primaryLight }, expenseCopy: { flex: 1 }, amount: { color: theme.colors.text, fontSize: 12, fontWeight: "700" },
  dayPicker: { flexDirection: "row", justifyContent: "space-between", gap: 5, marginVertical: theme.spacing.base }, day: { flex: 1, minHeight: 56, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.surface, borderRadius: 12, gap: 3 }, activeDay: { backgroundColor: theme.colors.primary }, dayName: { fontSize: 8, color: theme.colors.textSecondary, fontWeight: "700" }, dayNumber: { fontSize: 15, color: theme.colors.text, fontWeight: "700" }, activeDayText: { color: "#FFFFFF" }, dayHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.base }, dayTitle: { color: theme.colors.text, fontSize: 17, fontWeight: "800" }, weather: { flexDirection: "row", alignItems: "center", gap: 4 }, weatherText: { color: theme.colors.warning, fontSize: 12 }, timelineItem: { flexDirection: "row", gap: 10 }, timeCol: { width: 44, alignItems: "center" }, timeText: { color: theme.colors.textSecondary, fontSize: 10, fontWeight: "600", marginTop: 14 }, timelineLine: { flex: 1, width: 1, backgroundColor: theme.colors.border, marginVertical: 8 }, timelineCard: { flex: 1, marginBottom: 10 }, row: { flexDirection: "row", alignItems: "center", gap: 10 }, flex: { flex: 1 }, note: { marginTop: 5, color: theme.colors.success, fontSize: 10 },
  budgetHero: { backgroundColor: theme.colors.primary, padding: theme.spacing.base, borderRadius: theme.radius.xl, marginBottom: theme.spacing.lg }, budgetLabel: { color: "rgba(255,255,255,0.8)", fontSize: 9, fontWeight: "700", letterSpacing: 0.5 }, budgetTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 7 }, budgetValue: { color: "#FFFFFF", fontSize: 29, fontWeight: "800" }, budgetOf: { color: "rgba(255,255,255,0.78)", fontSize: 10, marginTop: 2 }, remaining: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" }, progressTrack: { height: 5, borderRadius: 4, backgroundColor: "rgba(20,36,58,0.16)", overflow: "hidden", marginTop: 14 }, progressFill: { height: "100%", borderRadius: 4, backgroundColor: "#FFFFFF" }, budgetBreakdown: { flexDirection: "row", justifyContent: "space-between", marginTop: 13 }, budgetSmall: { color: "rgba(255,255,255,0.75)", fontSize: 9 }, budgetSmallValue: { color: "#FFFFFF", fontSize: 12, fontWeight: "700", marginTop: 3 }, expenseForm: { marginBottom: 12 }, listCard: { borderRadius: theme.radius.lg }, expenseRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12 }, separator: { borderTopWidth: 1, borderColor: theme.colors.border }, splitTitle: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: theme.spacing.lg, marginBottom: 10 }, sectionHeading: { color: theme.colors.text, fontWeight: "700", fontSize: 15 }, splitGrid: { flexDirection: "row", gap: 7, marginBottom: 8 }, splitCell: { flex: 1, alignItems: "center" }, splitName: { fontSize: 9, color: theme.colors.textSecondary }, splitAmount: { fontSize: 11, fontWeight: "700", marginTop: 5 },
  chatDate: { textAlign: "center", color: theme.colors.textMuted, fontSize: 9, marginVertical: 12 }, messageRow: { flexDirection: "row", alignItems: "flex-end", gap: 7, marginBottom: 12 }, ownMessageRow: { justifyContent: "flex-end" }, miniAvatar: { width: 25, height: 25, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.primaryLight }, miniInitial: { color: theme.colors.primary, fontSize: 10, fontWeight: "700" }, bubble: { maxWidth: "83%", padding: 11, borderRadius: 15 }, otherBubble: { backgroundColor: theme.colors.surface, borderBottomLeftRadius: 5 }, ownBubble: { backgroundColor: theme.colors.primary, borderBottomRightRadius: 5 }, sender: { color: theme.colors.textSecondary, fontSize: 9, marginBottom: 5 }, messageText: { color: theme.colors.text, fontSize: 12, lineHeight: 17 }, ownText: { color: "#FFFFFF" }, composer: { flexDirection: "row", alignItems: "center", backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: theme.radius.full, paddingLeft: 14, paddingRight: 5, minHeight: 48, marginTop: 12 }, messageInput: { flex: 1, color: theme.colors.text, fontSize: 13, minHeight: 42 }, sendButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.primary, alignItems: "center", justifyContent: "center" }, readReceipt: { textAlign: "center", color: theme.colors.textSecondary, fontSize: 9, marginTop: 8 },
  taskSummary: { marginTop: 2, marginBottom: 12 }, rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, summaryTitle: { color: theme.colors.text, fontSize: 14, fontWeight: "700" }, taskFilters: { flexDirection: "row", gap: 7, marginBottom: 10 }, taskFilter: { borderRadius: theme.radius.full, paddingVertical: 8, paddingHorizontal: 11, backgroundColor: theme.colors.surfaceSecondary }, activeTaskFilter: { backgroundColor: theme.colors.text }, taskFilterText: { color: theme.colors.textSecondary, fontSize: 10, fontWeight: "600" }, activeTaskFilterText: { color: "#FFFFFF" }, taskRow: { minHeight: 64, backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg, borderWidth: 1, borderColor: theme.colors.border, paddingHorizontal: 12, marginBottom: 8, flexDirection: "row", alignItems: "center", gap: 11 }, checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: theme.colors.borderFocused, alignItems: "center", justifyContent: "center" }, checked: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }, taskCopy: { flex: 1 }, taskTitle: { color: theme.colors.text, fontWeight: "600", fontSize: 12 }, doneTask: { color: theme.colors.textMuted, textDecorationLine: "line-through" }, taskAvatar: { width: 25, height: 25, backgroundColor: theme.colors.warningLight, borderRadius: 13, justifyContent: "center", alignItems: "center" }, taskAvatarDone: { backgroundColor: theme.colors.successLight }, taskAvatarText: { color: theme.colors.textSecondary, fontSize: 10, fontWeight: "700" },
});
